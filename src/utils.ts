import axios from "axios";
import { isEmpty } from "lodash-es";

const baseURL = "https://api.thecatapi.com/v1";
const defaultHeaders = {
  "x-api-key": "DEMO-API-KEY"
};
const sub_id = "ct_test_cat";

/**
 * ENDPOINTS CALLS
 */

async function _get(url: string, headers?: {}) {
  const res = await axios.get(`${baseURL}${url}`, {
    headers: {
      ...defaultHeaders,
      headers
    }
  });

  return res.data;
}

async function _post(url: string, body?: {}, headers?: {}) {
  const res = await axios.post(`${baseURL}${url}`, body, {
    headers: {
      ...defaultHeaders,
      headers
    }
  });
  return res.data;
}

async function _delete(url: string, headers?: {}) {
  const res = await axios.delete(`${baseURL}${url}`, {
    headers: {
      ...defaultHeaders,
      headers
    }
  });

  return res.data;
}

/**
 * FAVOURITING
 */

async function getFavourites(): Promise<IFavourite[]> {
  const res = _get(`/favourites?sub_id=${sub_id}`);
  console.log("getFavourites", res);
  return res;
}

export async function getFavourite(image_id: string): Promise<IFavourite> {
  const favourites = await getFavourites();
  return favourites.filter((item) => item.image_id === image_id)[0];
}

export async function addFavourite(image_id: string): Promise<IConfirmation> {
  return await _post(
    `/favourites`,
    {
      image_id,
      sub_id: sub_id
    },
    {
      "Content-Type": "application/json"
    }
  );
}

export async function deleteFavourite(
  favouriteId: number
): Promise<IDeleteFavourite> {
  return _delete(`/favourites/${favouriteId}`);
}

interface IFavourite {
  created_at: string;
  id: 2066353;
  image: { id: string; url: string };
  image_id: string;
  sub_id: string;
  user_id: string;
}

interface IDeleteFavourite {
  message: string;
}

/**
 * IMAGES
 */

export async function uploadImage(file: File): Promise<IUploadImage> {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("sub_id", sub_id);

  return await _post(`/images/upload`, formData, {
    "Content-Type": "multipart/form-data"
  });
}

export async function getImages(): Promise<IImageData[]> {
  const res = _get(`/images?sub_id=${sub_id}`);
  console.log("getImages", res);
  return res;
}

interface IUploadImage {
  approved: number;
  height: number;
  id: string;
  original_filename: string;
  pending: number;
  sub_id: string;
  url: string;
  width: number;
}

export interface IImageData {
  breeds: [];
  id: string;
  url: string;
  width: number;
  height: number;
  sub_id: string;
  created_at: string;
  original_filename: string;
  breed_ids: [] | null;
}

/**
 * SCORING
 */

function deriveScore(score: []): number {
  return score.reduce((prev: {}, cur: any) => prev + cur.value, 0);
}

export async function getVotes(): Promise<number> {
  const res = await _get(`/votes?sub_id=${sub_id}`);

  return isEmpty(res) ? 0 : deriveScore(res);
}

export async function actionVote(
  image_id: string,
  value: number
): Promise<IConfirmation> {
  return await _post(
    `/votes`,
    {
      image_id,
      sub_id,
      value
    },
    {
      "Content-Type": "application/json"
    }
  );
}

interface IConfirmation {
  id: number;
  message: string;
}
