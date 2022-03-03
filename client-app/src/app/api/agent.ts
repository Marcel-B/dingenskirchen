import { User, UserFormValues } from '../models/user';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { Buchung } from '../models/buchung';
import { store } from '../stores/store';
import { toast } from 'react-toastify';
import { Tag } from '../models/tag';

const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(100);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data);
        }
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          // history.push('/not-found');
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error('unauthorized');
        break;
      case 404:
        // history.push('/not-found');
        break;
      case 500:
        store.commonStore.setServerError(data);
        // history.push('/server-error');
        break;
    }
    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Buchungen = {
  list: () => requests.get<Buchung[]>('/buchungen'),
  details: (id: string) => requests.get<Buchung>(`/buchungen/${id}`),
  create: (activity: Buchung) => requests.post<void>(`/buchungen`, activity),
  update: (activity: Buchung) =>
    requests.put<void>(`/buchungen/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/buchungen/${id}`),
};

const Tags = {
  list: () => requests.get<Tag[]>('/tag'),
  details: (id: string) => requests.get<Tag>(`/tag/${id}`),
  create: (tag: Tag) => requests.post<void>(`/tag`, tag),
  delete: (id: string) => requests.del<void>(`/tag/${id}`),
};

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) =>
    requests.post<User>('/account/register', user),
};

const agent = {
  Buchungen,
  Tags,
  Account,
};

export default agent;
