import Axios from 'axios';

import toSlimCharacter from './character';
import config from '../config';

import dextuin from '../fixtures/dextuin.json';
import enrique from '../fixtures/enrique.json';
import niamh from '../fixtures/niamh.json';

const isDev = process.env.NODE_ENV === 'development';

const baseAPI = Axios.create({
  baseURL: config.apiURL,
  timeout: 10000,
  headers: { 'Content-type': 'application/json; charset=utf-8' },
});

const api = {
  character: id => 
    isDev 
      ? Promise.resolve(api.fixtures.find(_id => _id === id))
      : baseAPI.get(`/character/${id}/json`)
        .then(resp => toSlimCharacter(resp.data)),
  
  characters: ids =>
    isDev 
      ? Promise.resolve(api.fixtures) 
      : Promise.all(ids.map(id => api.character(id))),
  
  fixtures: [
    toSlimCharacter(dextuin),
    toSlimCharacter(enrique),
    toSlimCharacter(niamh)
  ]
};

export default api;
