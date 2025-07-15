import api from './axios'

const API_BASE = 'http://localhost:8080/api/posts';

export const getPosts = async () => {
  const res = await api.get(API_BASE);
  return res.data;
};
