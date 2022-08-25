import axios from 'axios';
import {API_ROOT_URL, KEY} from '@env';

const catAxios = axios.create({
  baseURL: API_ROOT_URL,
  headers: {'x-api-key': KEY},
});

export const getAllCats = (page = 0, limit = 10) =>
  catAxios.get('/images/search', {params: {limit, page}});

export default catAxios;
