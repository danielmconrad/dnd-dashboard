import Axios from 'axios';

import toSlimCharacter from './character';
import niamh from '../fixtures/niamh.json';
import config from '../config';

const api = Axios.create({
  baseURL: config.apiURL,
  timeout: 1000,
  headers: { 'Content-type': 'application/json; charset=utf-8' },
});

const service = {
  character: id =>
    api.get(`/character/${id}/json`)
      .then(resp => toSlimCharacter(resp.data)),
  
  characters: ids =>
    Promise.all(ids.map(id => service.character(id))),
  
  fixtures: [
    toSlimCharacter(niamh)
  ]
};

export default service;
