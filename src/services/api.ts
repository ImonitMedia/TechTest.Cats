import axios from "axios";

class API {
  constructor() {
    this.baseURL = "https://api.thecatapi.com/v1";
    this.token = "";
    this.defaultHeaders = {
      "x-api-key": "DEMO-API-KEY"
    };
    this.sub_id = "ct_test_cat2";
  }

  async get(url: string, headers?: {}) {
    const res = await axios.get(`${this.baseURL}${url}`, {
      headers: {
        ...this.defaultHeaders,
        headers
      }
    });
    return res.data;
  }

  async post(url: string, body?: {}, headers?: {}) {
    const res = await axios.post(`${this.baseURL}${url}`, body, {
      headers: {
        ...this.defaultHeaders,
        headers
      }
    });
    return res.data;
  }

  async delete(url: string, headers?: {}) {
    const res = await axios.delete(`${this.baseURL}${url}`, {
      headers: {
        ...this.defaultHeaders,
        headers
      }
    });
    return res.data;
  }
}

export const api = new API();

interface API {
  baseURL: "https://api.thecatapi.com/v1";
  defaultHeaders: {
    [x: string]: string;
  };
  sub_id: string;
  token: string;
}
