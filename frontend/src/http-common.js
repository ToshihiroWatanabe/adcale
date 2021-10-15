import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3030/api",
  headers: {
    "Content-type": "application/json",
  },
});
