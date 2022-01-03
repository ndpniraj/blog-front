import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4646/api" });

export default client;
