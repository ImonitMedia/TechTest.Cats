import { api } from "./api";

class Favouriting {
  async getFavourites() {
    return api.get(`/favourites?sub_id=${api.sub_id}`);
  }

  async getFavourite(image_id: string) {
    const favourites = await this.getFavourites();
    return favourites.filter((item) => item.image_id === image_id)[0];
  }

  async setFavourite(image_id: string) {
    const res = await api.post(
      `/favourites`,
      {
        image_id,
        sub_id: api.sub_id
      },
      {
        "Content-Type": "application/json"
      }
    );

    return res;
  }

  async removeFavourite(favouriteId: number) {
    return api.delete(`/favourites/${favouriteId}`);
  }
}

export const favouriting = new Favouriting();
