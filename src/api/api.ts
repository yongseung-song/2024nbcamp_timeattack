import axios from 'axios';

const client = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr',
  // withCredentials: true
});

export default client;
