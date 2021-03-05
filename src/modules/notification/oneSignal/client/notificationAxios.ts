import axios from "axios";

const notificationAxios = axios.create({
  baseURL: process.env.NOTIFICATION_REST_URL,
  headers: {
    Authorization:  `Basic ${process.env.NOTIFICATION_REST_KEY}`
  },
  timeout: 1000
});

export default notificationAxios;
