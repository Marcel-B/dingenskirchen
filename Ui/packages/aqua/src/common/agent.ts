import axios, { AxiosResponse } from 'axios';
import {
  Aquarium,
  Feed,
  Notiz,
  NotizFormValues,
  AquariumFormValues,
  Fisch,
  FischFormValues,
  Duengung,
  DuengungFormValues,
  MessungFormValues,
  Messung, User, UserFormValues,
} from 'shared-types';
import { store } from "../store/store";


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.defaults.baseURL = 'http://localhost:5046';
// axios.defaults.baseURL = 'http://192.168.2.103:3088';

axios.interceptors.request.use(config => {
  const state = store?.getState();
  const token = state?.user?.token;
  if (token) {
    if (config.headers)
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Aquarium = {
  list: () => requests.get<Aquarium[]>('/api/aquarium'),
  //details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (aquarium: AquariumFormValues) => requests.post<Aquarium>('/api/aquarium', aquarium),
  update: (aquarium: AquariumFormValues) => requests.put<Aquarium>(`/api/aquarium/${aquarium.id}`, aquarium),
  delete: (id: string) => requests.del<string>(`/api/aquarium/${id}`),
};

const Notiz = {
  list: () => requests.get<Notiz[]>('/api/notiz'),
  //details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (notiz: NotizFormValues) => requests.post<Notiz>('/api/notiz', notiz),
  update: (notiz: NotizFormValues) => requests.put<Notiz>(`/api/notiz/${notiz.id}`, notiz),
  delete: (id: string) => requests.del<string>(`/api/notiz/${id}`),
};

const Fisch = {
  list: () => requests.get<Fisch[]>('/api/fisch'),
  create: (fisch: FischFormValues) => requests.post<Fisch>('/api/fisch', fisch),
  update: (fisch: FischFormValues) => requests.put<Fisch>(`/api/fisch/${fisch.id}`, fisch),
  delete: (id: string) => requests.del<string>(`/api/fisch/${id}`),
};

const Duengung = {
  list: () => requests.get<Duengung[]>('/api/duengung'),
  create: (duengung: DuengungFormValues) => requests.post<Duengung>('/api/duengung', duengung),
  update: (duengung: DuengungFormValues) => requests.put<Duengung>(`/api/duengung/${duengung.id}`, duengung),
  delete: (id: string) => requests.del<string>(`/api/duengung/${id}`),
};

const Messung = {
  list: () => requests.get<Messung[]>('/api/messung'),
  create: (messung: MessungFormValues) => requests.post<Messung>('/api/messung', messung),
  update: (messung: MessungFormValues) => requests.put<Messung>(`/api/messung/${messung.id}`, messung),
  delete: (id: string) => requests.del<string>(`/api/messung/${id}`),
};

const Feed = {
  list: () => requests.get<Feed>('/api/feed/grouped')
};

const Tag = {
  list: () => requests.get<string[]>('/api/tag')
};

const Account = {
  current: () => requests.get<User>('/api/account'),
  login: (user: UserFormValues) => requests.post<User>('/api/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/api/account/register', user)
}

const agent = {
  Aquarium,
  Notiz,
  Duengung,
  Feed,
  Fisch,
  Messung,
  Tag,
  Account
};

export default agent;