import axios from "axios";

import { makeServerServices } from "./services";



const makeApiServices = () => {
  const backendApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/api/",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  return {
    serverService: makeServerServices(backendApi),
  };
};

export default makeApiServices;
