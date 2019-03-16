import Axios from 'axios';

import config from '../config';

import dextuin from '../fixtures/dextuin.json';
// import enrique from '../fixtures/enrique.json';
import rando from '../fixtures/rando.json';
import niamh from '../fixtures/niamh.json';
import apiConfig from '../fixtures/config.json';

const isDev = process.env.NODE_ENV === 'development';

const baseAPI = Axios.create({
  baseURL: config.apiURL,
  timeout: 10000,
  headers: { 'Content-type': 'application/json; charset=utf-8' },
});

const api = {
  config: () => isDev
    ? Promise.resolve(apiConfig)
    : baseAPI.get('/api/config/json').then(resp => resp.data),

  character: id => isDev
    ? Promise.resolve(api.fixtures.find(_id => _id === id))
    : baseAPI.get(`/character/${id}/json`).then(resp => resp.data),

  characters: ids => isDev
    ? Promise.resolve(api.fixtures)
    : Promise.all(ids.map(id => api.character(id))),

  fixtures: [
    dextuin,
    rando,
    niamh,
    rando,
    niamh,
    dextuin
  ]
};

export default api;
