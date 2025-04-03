import axios from 'axios'

const Account = axios.create({
  baseURL:
    'https://core_backend.ichico.solutions',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


export { Account }