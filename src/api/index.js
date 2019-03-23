import Axios from 'axios';

import brine from '../fixtures/brine.json';
import dextuin from '../fixtures/dextuin.json';
import enrique from '../fixtures/enrique.json';
import gnome from '../fixtures/gnome.json';
import niamh from '../fixtures/niamh.json';
import ollie from '../fixtures/ollie.json';
import rando from '../fixtures/rando.json';

import characterConfig from '../fixtures/config.json';

const IS_DEV = process.env.NODE_ENV === 'development';
const API_URL = process.env.REACT_APP_API_URL;

const baseAPI = Axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { 'Content-type': 'application/json; charset=utf-8' },
});

const api = {
  characterConfig: () => IS_DEV
    ? resolveAFter(characterConfig, 100)
    : baseAPI.get('/api/config/json').then(resp => resp.data),

  character: id => IS_DEV
    ? resolveAFter(api.fixtures.find(char => char.id === parseInt(id)), 100)
    : baseAPI.get(`/character/${id}/json`).then(resp => resp.data),

  characters: ids => Promise.all(ids.map(id => api.character(id))),

  fixtures: [
    brine,
    dextuin,
    enrique,
    gnome,
    niamh,
    ollie,
    rando,
  ]
};

const resolveAFter = (value, waitTime) =>
  new Promise(resolve => setTimeout(() => resolve(value), waitTime));

export default api;
