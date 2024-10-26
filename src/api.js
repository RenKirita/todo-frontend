import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Rails APIのベースURL
});

export const fetchTodos = async () => {
  const response = await api.get('/todos');
  return response.data;
};