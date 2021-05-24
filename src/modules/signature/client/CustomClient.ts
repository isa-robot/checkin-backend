import axios from "axios";

const client = axios.create({
  baseURL: process.env.SIGNATURE_URL,
  timeout: 5000
});

export default client;
