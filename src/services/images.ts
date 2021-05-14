import { api } from "./api";

class Images {
  async upload(file: File) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("sub_id", api.sub_id);

    const res = await api.post(`/images/upload`, formData, {
      "Content-Type": "multipart/form-data"
    });

    return res;
  }

  async fetch() {
    return api.get(`/images?sub_id=${api.sub_id}`);
  }
}

export const images = new Images();
