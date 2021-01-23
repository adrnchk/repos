import React from "react";
import { useSelector } from "react-redux";
import Article from "../components/Article";

function Home() {
  const items = useSelector(({ articles }: any) => articles.items);
  return (
    <div className="content">
      <div className="container">
        <h1>Top stories</h1>
        <div className="content__items">
          {items[0] &&
            items[0].map((obj: any) => (
              <Article key={obj.url} media={obj}></Article>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
