import axios from 'axios';

export const API_BASE = 'http://15.165.87.88:8080';

const axiosClient = axios.create({
  baseURL: API_BASE,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const formDataClient = axios.create({
  baseURL: API_BASE,
  timeout: 50000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const get = (url, config) => {
  const response = axiosClient.get(url, config || {});
  return response;
};

export const post = async (url, data) => {
  const response = await axiosClient.post(url, data);
  return response;
}

export const del = async (url, data) => {
  const response = await axiosClient.delete(url, { data });
  return response;
}

export const put = async (url, data) => {
  const response = await axiosClient.put(url, data);
  return response;
}

export const formDataPost = async (url, data) => {
  const response = await formDataClient.post(url, data);
  return response;
}

export const formDataPatch = async (url, data) => {
  const response = await formDataClient.patch(url, data);
  return response;
}

export const getBlob = async (url) => {
  const response = await blobClient.get(url);
  return response;
}