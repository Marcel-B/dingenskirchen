import { ServerError } from '../models/serverError';

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = window.localStorage.getItem('jwt');
  appLoaded = false;

  constructor() {
    // wird ausgeführt, wenn sich token ändert
    const token = "123";
    if (token) {
      window.localStorage.setItem('jwt', token);
    } else {
      window.localStorage.removeItem('jwt');
    }
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}