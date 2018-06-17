import axios from 'axios'

export function getTest() {
  return axios.get('/apitest');
}