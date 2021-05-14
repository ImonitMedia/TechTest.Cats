import { MouseEvent, useEffect, useState } from "react";
import { favouriting, scoring } from "../../services";
import { Loading } from "../";
import "./Item.scss";

export function Item(props: IProps) {
  const [favouriteId, setFavouriteId] = useState<number>(undefined);
  const [score, setScore] = useState<any>(0);
  const [isLoading, setIsLoading] = useState<string>("Loading your cat...");
  const { item } = props;
  const { id: image_id, sub_id } = item;

  function getInitial() {
    const fetchData = async () => {
      const scoreRes = await scoring.getScore();
      setScore(scoreRes);

      const favouriteRes = await favouriting.getFavourite(image_id);
      if (favouriteRes) setFavouriteId(favouriteRes.id);
      setIsLoading(undefined);
    };

    fetchData();
  }

  useEffect(getInitial, [image_id, sub_id]);

  async function setVote(value: number) {
    const res = await scoring.setVote(image_id, value);

    if (res) {
      const scoreRes = await scoring.getScore();
      setScore(scoreRes);
      setIsLoading(undefined);
    }
  }

  function upVote(e: MouseEvent) {
    e.preventDefault();
    setIsLoading("Upvoting your cat...");
    setVote(1);
  }

  function downVote(e: MouseEvent) {
    e.preventDefault();
    setIsLoading("Downvoting your cat...");
    setVote(0);
  }

  async function setFavourite() {
    setIsLoading("Favouriting your cat...");
    const res = await favouriting.setFavourite(image_id);
    if (res.message === "SUCCESS") setFavouriteId(res.id);
    setIsLoading(undefined);
  }

  async function removeFavourite() {
    setIsLoading("Removing favourite...");
    const res = await favouriting.removeFavourite(favouriteId);
    if (res.message === "SUCCESS") setFavouriteId(res.id);
    setIsLoading(undefined);
  }

  return (
    <div className="item">
      <p>
        <img src={item.url} width="100%" alt="" />
      </p>
      <p>
        Score: {score}
        <br />
        Vote:
        <a href="javascript;" onClick={upVote}>
          Upvote
        </a>
        {" | "}
        <a href="javascript;" onClick={downVote}>
          Downvote
        </a>
      </p>
      <button onClick={favouriteId ? removeFavourite : setFavourite}>
        {favouriteId ? "Remove favourite" : "Favourite"}
      </button>
      {isLoading && <Loading message={isLoading} size="small" />}
    </div>
  );
}

interface IProps {
  item: Item;
}

export interface Item {
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
