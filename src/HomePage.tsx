import { useEffect, useState } from "react";
import { isEmpty } from "lodash-es";
import { Link } from "react-router-dom";
import { images } from "./services";
import { Item, Loading } from "./components";
import "./styles.scss";

export function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<any>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await images.fetch();
      setItems(res);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <h1>View all cats</h1>

      <div className="items">
        {!isEmpty(items) ? (
          <>
            {items.map((item: Item) => (
              <Item item={item} key={item.id} />
            ))}
          </>
        ) : (
          <p>
            You currently have no cats, please{" "}
            <Link to="/upload">Click here</Link> to upload a new cat.
          </p>
        )}
      </div>

      {isLoading && <Loading message="Loading your cats..." size="large" />}
    </div>
  );
}
