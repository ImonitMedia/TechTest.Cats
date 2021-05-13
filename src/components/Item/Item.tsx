import { MouseEvent, useEffect, useState } from "react";
import { isEmpty } from "lodash-es";
import { api } from "../../services";
import { deriveScore } from "../../utilities";
import "./Item.scss";

export function Item(props: IProps) {
  const [score, setScore] = useState<any>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { item } = props;
  const { id: image_id, sub_id } = item;

  function getScore() {
    const fetchData = async () => {
      const res = await api.getScore(sub_id);
      setIsLoading(false);
      setScore(isEmpty(res) ? 0 : deriveScore(res));
    };

    fetchData();
  }

  function setVote(value: number) {
    const fetchData = async () => {
      const res = await api.setVote(image_id, sub_id, value);
      if (res) getScore();
    };
    fetchData();
  }

  function upVote(e: MouseEvent) {
    e.preventDefault();
    setIsLoading(true);
    setVote(1);
  }

  function downVote(e: MouseEvent) {
    e.preventDefault();
    setIsLoading(true);
    setVote(0);
  }

  useEffect(getScore, [sub_id]);

  return (
    <div className="item">
      <img src={item.url} width="100%" alt="" />
      <p>Score: {score}</p>
      <p>
        <a href="javascript;" onClick={upVote}>
          Upvote this cat
        </a>
        <br />
        <a href="javascript;" onClick={downVote}>
          Downvote this cat
        </a>
      </p>
      <button>Favourite</button>
      {isLoading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
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
