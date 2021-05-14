import { useEffect, useState } from "react";
import { isEmpty } from "lodash-es";
import { Link } from "react-router-dom";
import { getImages, IImageData } from "./utils";
import { Item } from "./components/Item";
import { Loading } from "./components/Loading";
import "./styles.scss";

export function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<IImageData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getImages();
      setItems(res);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <h1>View all cats</h1>

      <div className="items">
        {isEmpty(items) ? (
          <p>
            You currently have no cats, please{" "}
            <Link to="/upload">Click here</Link> to upload a new cat.
          </p>
        ) : (
          <>
            {items.map((item: IImageData) => (
              <Item item={item} key={item.id} />
            ))}
          </>
        )}
      </div>

      {isLoading && <Loading message="Loading your cats..." size="large" />}
    </div>
  );
}
