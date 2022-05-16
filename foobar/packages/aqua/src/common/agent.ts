import axios, {AxiosResponse} from 'axios';
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
    Tag,
    MessungFormValues,
    Messung,
} from 'shared-types';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.defaults.baseURL = 'http://localhost:3088';

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Aquarium = {
    list: () => axios.get<Aquarium[]>('/api/aquarium')
        .then(responseBody),
    //details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (aquarium: AquariumFormValues) => requests.post<Aquarium>('/api/aquarium', aquarium),
    //update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<string>(`/api/aquarium/${id}`),
};

const Notiz = {
    list: () => axios.get<Notiz[]>('/api/notiz')
        .then(responseBody),
    //details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (notiz: NotizFormValues) => requests.post<Notiz>('/api/notiz', notiz),
    //update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<string>(`/api/notiz/${id}`),
};

const Fisch = {
    list: () => axios.get<Fisch[]>('/api/fisch')
        .then(responseBody),
    create: (fisch: FischFormValues) => requests.post<Fisch>('/api/fisch', fisch),
    delete: (id: string) => requests.del<string>(`/api/fisch/${id}`),
};

const Duengung = {
    list: () => axios.get<Duengung[]>('/api/duengung')
        .then(responseBody),
    create: (duengung: DuengungFormValues) => requests.post<Duengung>('/api/duengung', duengung),
    delete: (id: string) => requests.del<string>(`/api/duengung/${id}`),
};

const Messung = {
    list: () => axios.get<Messung[]>('/api/messung')
        .then(responseBody),
    create: (messung: MessungFormValues) => requests.post<Messung>('/api/messung', messung),
    delete: (id: string) => requests.del<string>(`/api/messung/${id}`),
};

const Feed = {
    list: () => axios.get<Feed[]>('/api/feed')
        .then(responseBody),
};

const Tag = {
    list: () => axios.get<string[]>('/api/tag')
        .then(responseBody),
};

const agent = {
    Aquarium,
    Notiz,
    Duengung,
    Feed,
    Fisch,
    Messung,
    Tag,
};

export default agent;