import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import "./Nav.scss";

const navItems: NavItem[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Upload",
    url: "/upload",
  },
];

export function Nav() {
  const { pathname } = useLocation();

  return (
    <ul className="nav">
      {navItems.map((link: NavItem) => (
        <li key={link.title}>
          <Link
            to={link.url}
            className={classNames({
              active: pathname === link.url,
            })}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

interface NavItem {
  title: string;
  url: string;
}
