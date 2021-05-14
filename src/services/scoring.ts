import { isEmpty } from "lodash-es";
import { api } from "./api";

class Scoring {
  async getScore() {
    const res = await api.get(`/votes?sub_id=${api.sub_id}`);

    return isEmpty(res) ? 0 : this.deriveScore(res);
  }

  async setVote(image_id: string, value: number) {
    const headers = {
      "Content-Type": "application/json"
    };

    const body = {
      image_id,
      sub_id: api.sub_id,
      value
    };

    return await api.post(`/votes`, body, headers);
  }

  deriveScore(score: []) {
    return score.reduce((prev: {}, cur: any) => prev + cur.value, 0);
  }
}

export const scoring = new Scoring();
