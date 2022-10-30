import { RequesterPayload } from './requester.types';

const apiRoute = `http://localhost:5003/api/v1`;

export const get = (endpoint: string) => {
  return fetch(`${apiRoute}${endpoint}`);
};

export const post = (endpoint: string, payload: RequesterPayload) => {
  const opts = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return fetch(`${apiRoute}${endpoint}`, opts);
};

export default {
  get,
  post,
};
