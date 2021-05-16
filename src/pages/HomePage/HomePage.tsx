import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash-es";
import { Link } from "react-router-dom";
import { getImages } from "services";
import { IImageData } from "types";
import { Alert } from "components/Alert/Alert";
import { Item } from "components/Item/Item";
import { Loading } from "components/Loading/Loading";
import "./HomePage.scss";

export function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<IImageData[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getImages();

      if (typeof res === "string") {
        setError(`Errors loading cats: ${res}`);
      } else {
        setItems(res);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="home-page">
        <h1>View all cats</h1>

        {!isLoading && !error && (
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
        )}

        {error && <Alert message={error} type="error" />}
      </div>
      {isLoading && <Loading message="Loading your cats..." size="large" />}
    </>
  );
}
