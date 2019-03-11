import Axios from 'axios';

import character from './character';
import niamh from '../fixtures/niamh.json';

const api = Axios.create({
  baseURL: '/',
  timeout: 1000,
  headers: { 'Content-type': 'application/json; charset=utf-8' },
});

const service = {
  character: id =>
    api.get(`/character/${id}/json`)
      .then(resp => character(resp.data)),
  fixtures: [
    character(niamh)
  ]
};


export default service;
