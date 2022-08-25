import axios from 'axios';
import {API_ROOT_URL, KEY} from '@env';

const catAxios = axios.create({
  baseURL: API_ROOT_URL,
  headers: {'x-api-key': KEY},
});

export const getAllCats = (page = 0, limit = 10, breed_id) => {
  return catAxios.get('/v1/images/search', {params: {limit, page, breed_id}});
};

export const getBreeds = () => catAxios.get('/v1/breeds');

export default catAxios;
