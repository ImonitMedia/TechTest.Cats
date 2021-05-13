import axios from "axios";

class API {
  constructor() {
    this.baseURL = "https://api.thecatapi.com/v1";
    this.token = "";
    this.defaultHeaders = {
      "x-api-key": "DEMO-API-KEY"
    };
  }

  /**
   * ENDPOINT ACTIONS
   */

  async get(url: string, headers?: {}) {
    const res = await axios.get(`${this.baseURL}${url}`, {
      headers: {
        ...this.defaultHeaders,
        headers
      }
    });
    return res.data;
  }

  async post(url: string, headers?: {}, body?: {}) {
    const res = await axios.post(`${this.baseURL}${url}`, body, {
      headers: {
        ...this.defaultHeaders,
        headers
      }
    });
    return res.data;
  }

  /**
   * DATA ACTIONS
   */

  async upload() {}

  async favourite() {}

  async fetch() {
    return this.get("/images");
  }

  async getScore(sub_id: string) {
    return await this.get(`/votes?sub_id=${sub_id}`);
  }

  async setVote(image_id: string, sub_id: string, value: number) {
    const headers = {
      "Content-Type": "application/json"
    };

    const body = {
      image_id,
      sub_id,
      value
    };

    return await this.post(`/votes`, headers, body);
  }
}

export const api = new API();

interface API {
  baseURL: "https://api.thecatapi.com/v1";
  defaultHeaders: {
    headers: {
      [x: string]: string;
    };
  };
  token: string;
}
