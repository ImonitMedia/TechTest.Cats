export interface IConfirmation {
  id: number;
  message: string;
}

export interface IFavourite {
  created_at: string;
  id: 2066353;
  image: { id: string; url: string };
  image_id: string;
  sub_id: string;
  user_id: string;
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

export interface IScoreData {
  id: number;
  image_id: string;
  sub_id: string;
  created_at: string;
  value: number;
}

export interface IUploadImage {
  approved: number;
  height: number;
  id: string;
  original_filename: string;
  pending: number;
  sub_id: string;
  url: string;
  width: number;
}
