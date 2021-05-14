import { Route, Switch } from "react-router-dom";
import { HomePage } from "./HomePage";
import { Nav } from "./components/Nav";
import { Upload } from "./Upload";
import "./styles.scss";

export default function App() {
  return (
    <div className="container">
      <header>
        <p className="title">Welcome to CATS</p>
        <Nav />
      </header>
      <main>
        <Switch>
          <Route path="/upload" component={Upload} />
          <Route component={HomePage} />
        </Switch>
      </main>
    </div>
  );
}
