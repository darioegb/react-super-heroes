import axios, { AxiosInstance } from 'axios';

let instances: AxiosInstance[] = [];
// Default headers
const headers = {
  'Content-type': 'application/json',
};

const defaultInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers,
});

instances = [defaultInstance]; // Each new instance must be added in array

export { instances };
