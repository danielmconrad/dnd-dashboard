import Axios from 'axios';

import toSlimCharacter from './character';
import niamh from '../fixtures/niamh.json';
import config from '../config';

const baseAPI = Axios.create({
  baseURL: config.apiURL,
  timeout: 10000,
  headers: { 'Content-type': 'application/json; charset=utf-8' },
});

const api = {
  character: id =>
    baseAPI.get(`/character/${id}/json`)
      .then(resp => toSlimCharacter(resp.data)),
  
  characters: ids =>
    Promise.all(ids.map(id => api.character(id))),
  
  fixtures: [
    toSlimCharacter(niamh)
  ]
};

export default api;
