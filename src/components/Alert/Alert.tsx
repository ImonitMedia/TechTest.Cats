import React, { ReactNode } from "react";
import "./Alert.scss";

export function Alert(props: IProps) {
  const { message, type } = props;
  return <div className={type}>{message}</div>;
}

interface IProps {
  message: string | ReactNode;
  type: "error" | "success";
}
