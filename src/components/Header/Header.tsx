import React from "react";
import { Nav } from "components/Nav/Nav";
import "./Header.scss";

export function Header() {
  return (
    <header className="header">
      <p className="title">Welcome to CATS</p>
      <Nav />
    </header>
  );
}
