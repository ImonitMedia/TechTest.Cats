import axios, { AxiosError } from "axios";
import { isEmpty, reduce } from "lodash-es";
import {
  IConfirmation,
  IFavourite,
  IImageData,
  IScoreData,
  IUploadImage,
} from "types";

const sub_id = "ct_test_cat";
const baseURL = "https://api.thecatapi.com/v1";
const defaultHeaders = {
  "x-api-key": "DEMO-API-KEY",
};

/**
 * ENDPOINTS CALLS
 */

function catchErrors(err: AxiosError) {
  if (err.response) {
    return {
      data: err.response.data.message,
    };
  } else {
    return {
      data: err.request.data.message,
    };
  }
}

async function _get(url: string, headers?: {}) {
  const res = await axios
    .get(`${baseURL}${url}`, {
      headers: {
        ...defaultHeaders,
        headers,
      },
    })
    .catch(catchErrors);

  return res.data;
}

async function _post(url: string, body?: {}, headers?: {}) {
  const res = await axios
    .post(`${baseURL}${url}`, body, {
      headers: {
        ...defaultHeaders,
        headers,
      },
    })
    .catch(catchErrors);

  return res.data;
}

async function _delete(url: string, headers?: {}) {
  const res = await axios
    .delete(`${baseURL}${url}`, {
      headers: {
        ...defaultHeaders,
        headers,
      },
    })
    .catch(catchErrors);

  return res.data;
}

/**
 * FAVOURITING
 */

export async function getFavourite(image_id: string): Promise<IFavourite> {
  const favourites = await _get(`/favourites?sub_id=${sub_id}`);
  return favourites.filter((item: IFavourite) => item.image_id === image_id)[0];
}

export async function addFavourite(image_id: string): Promise<IConfirmation> {
  return await _post(
    `/favourites`,
    {
      image_id,
      sub_id: sub_id,
    },
    {
      "Content-Type": "application/json",
    }
  );
}

export async function deleteFavourite(
  favouriteId: number | null
): Promise<IConfirmation> {
  return _delete(`/favourites/${favouriteId}`);
}

/**
 * IMAGES
 */

export async function uploadImage(file: File): Promise<IUploadImage> {
  let formData = new FormData();

  console.log("file", file);

  formData.append("file", file);
  formData.append("sub_id", sub_id);

  return await _post(`/images/upload`, formData, {
    "Content-Type": "multipart/form-data",
  });
}

export async function getImages(): Promise<IImageData[]> {
  return _get(`/images?sub_id=${sub_id}`);
}

/**
 * SCORING
 */

export async function getVotes(): Promise<number> {
  const res = await _get(`/votes?sub_id=${sub_id}`);

  return typeof res === "string"
    ? 999999
    : isEmpty(res)
    ? 0
    : reduce(
        res,
        (prev: number, current: IScoreData) => prev + current.value,
        0
      );
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
      value,
    },
    {
      "Content-Type": "application/json",
    }
  );
}
