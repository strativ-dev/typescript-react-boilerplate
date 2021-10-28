import { store } from 'store';
import { app } from 'store/actions';

export class HttpService {
  constructor(protected baseURL: string) {
    this.baseURL = baseURL;
  }

  private headers = () => {
    const token = ''; // get token from localStorage/cookie
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (token) headers.Authorization = token;
    return headers;
  };

  private response = async (
    method: Methods,
    url: string,
    payload = {} as unknown,
  ) => {
    store.dispatch(app.updateRoute('start'));
    const options: RequestInit = {
      method,
      headers: this.headers(),
    };
    if (method !== 'GET') options.body = JSON.stringify(payload);

    const res = await fetch(`${this.baseURL + '/' + url}`, options);
    const data = await res.json();
    store.dispatch(app.updateRoute('complete'));
    return data;
  };

  get = async <T>(url: string): Promise<T> => this.response('GET', url);

  post = async <T>(url: string, payload: unknown): Promise<T> =>
    this.response('POST', url, payload);

  put = async <T>(url: string, payload: unknown): Promise<T> =>
    this.response('PUT', url, payload);

  delete = async <T>(url: string, payload: unknown): Promise<T> =>
    this.response('DELETE', url, payload);
}

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';