import axios from 'axios';

const clientInstance = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr',
  // withCredentials: true
});

export default clientInstance;
