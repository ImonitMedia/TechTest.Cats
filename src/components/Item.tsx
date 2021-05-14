import { MouseEvent, useEffect, useState } from "react";
import {
  getFavourite,
  getVotes,
  deleteFavourite,
  addFavourite,
  actionVote,
  IImageData
} from "../utils";
import { Loading } from "./Loading";
import "./Item.scss";

export function Item(props: IProps) {
  const [favouriteId, setFavouriteId] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<string>("Loading your cat...");
  const { item } = props;
  const { id: image_id, sub_id } = item;

  function getInitial() {
    const fetchData = async () => {
      const scoreRes = await getVotes();
      setScore(scoreRes);

      const favouriteRes = await getFavourite(image_id);
      if (favouriteRes) setFavouriteId(favouriteRes.id);
      setIsLoading("");
    };

    fetchData();
  }

  useEffect(getInitial, [image_id, sub_id]);

  async function setVote(value: number) {
    const res = await actionVote(image_id, value);

    if (res) {
      const scoreRes = await getVotes();
      setScore(scoreRes);
      setIsLoading("");
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
    const res = await addFavourite(image_id);
    if (res.message === "SUCCESS") setFavouriteId(res.id);
    setIsLoading("");
  }

  async function removeFavourite() {
    setIsLoading("Removing favourite...");
    const res = await deleteFavourite(favouriteId);
    if (res.message === "SUCCESS") setFavouriteId(res.id);
    setIsLoading("");
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
  item: IImageData;
}
