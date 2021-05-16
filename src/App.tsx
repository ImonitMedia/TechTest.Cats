import React from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage";
import { Upload } from "pages/Upload/Upload";
import "styles/default.scss";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/upload" component={Upload} />
          <Route component={HomePage} />
        </Switch>
      </main>
    </>
  );
}
