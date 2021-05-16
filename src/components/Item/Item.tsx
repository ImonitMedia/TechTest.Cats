import React, { MouseEvent, useEffect, useState } from "react";
import {
  getFavourite,
  getVotes,
  deleteFavourite,
  addFavourite,
  actionVote,
} from "services";
import { IImageData } from "types";
import { Alert } from "components/Alert/Alert";
import { Loading } from "components/Loading/Loading";
import "./Item.scss";

export function Item(props: IProps) {
  const [favouriteId, setFavouriteId] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<string>("Loading your cat...");
  const { item } = props;
  const { id: image_id, sub_id } = item;

  function getInitial() {
    const fetchData = async () => {
      const scoreRes = await getVotes();

      if (scoreRes === 999999) {
        setError(`Errors loading score: ${scoreRes}`);
      } else {
        setScore(scoreRes);
        const favouriteRes = await getFavourite(image_id);
        if (favouriteRes) setFavouriteId(favouriteRes.id);
      }

      setIsLoading("");
    };

    fetchData();
  }

  useEffect(getInitial, [image_id, sub_id]);

  async function setVote(value: number) {
    const res = await actionVote(image_id, value);

    if (typeof res === "string") {
      setError(`Errors voting: ${res}`);
    } else {
      const scoreRes = await getVotes();
      setScore(scoreRes);
    }
    setIsLoading("");
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

  async function setFavourite(e: MouseEvent) {
    e.preventDefault();
    setIsLoading("Favouriting your cat...");

    const res = await addFavourite(image_id);

    if (typeof res === "string") {
      setError(`Errors favourite: ${res}`);
    } else {
      setFavouriteId(res.id);
    }

    setIsLoading("");
  }

  async function removeFavourite(e: MouseEvent) {
    e.preventDefault();
    setIsLoading("Removing favourite...");

    const res = await deleteFavourite(favouriteId);

    if (typeof res === "string") {
      setError(`Errors favourite: ${res}`);
    } else {
      setFavouriteId(null);
    }

    setIsLoading("");
  }

  return (
    <div className="item">
      <p>
        <img src={item.url} width="100%" alt="" />
      </p>

      <div className="favouriting">
        <a
          href="javascript;"
          onClick={favouriteId ? removeFavourite : setFavourite}
        >
          {favouriteId ? (
            <>
              <span>&#128152;</span> Remove favourite
            </>
          ) : (
            <>
              <span>&#128155;</span> Favourite
            </>
          )}
        </a>
      </div>

      <div className="voting">
        <span className="score">
          Score: <mark>{score}</mark>
        </span>

        <span className="actions">
          <a href="javascript;" onClick={upVote} title="Upvote">
            &#128077;
          </a>
          {" | "}
          <a href="javascript;" onClick={downVote} title="Downvote">
            &#128078;
          </a>
        </span>
      </div>

      {error && <Alert message={error} type="error" />}
      {isLoading && <Loading message={isLoading} size="small" />}
    </div>
  );
}

interface IProps {
  item: IImageData;
}
