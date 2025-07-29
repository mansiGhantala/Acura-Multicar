import axios from "axios";

const api = axios.create({
  baseURL: "https://acura-multicar.onrender.com/api",
  withCredentials: true,
});
