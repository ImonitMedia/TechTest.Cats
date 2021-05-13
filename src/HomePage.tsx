import { useEffect, useState } from "react";
import { api } from "./services";
import { Item } from "./components";
import "./styles.scss";

export function HomePage() {
  const [items, setItems] = useState<any>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.fetch();
      setItems(res);
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <h1>View all cats</h1>

      <div className="items">
        {items && (
          <>
            {items.map((item: Item) => (
              <Item item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
