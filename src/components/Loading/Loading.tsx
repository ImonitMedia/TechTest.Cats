import React from "react";
import classNames from "classnames";
import "./Loading.scss";

export function Loading(props: IProps) {
  const { message, size } = props;

  return (
    <div className={classNames("loading", size)}>
      <p>{message}</p>
    </div>
  );
}

interface IProps {
  message: string;
  size: "large" | "small";
}
