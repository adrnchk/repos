import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../fire";

function Page() {
  let { id } = useParams<{ id: string }>();
  let user = firebase.auth().currentUser;
  console.log(id);

  let item = useSelector(({ articles }: any) =>
    articles.items[0]?.find((article: any) => article.id.toString() === id)
  );
  console.log(item);
  return (
    <div className="mainPage">
      {user ? (
        <div>
          <div className="shadow">
            <img src={item?.img} alt="img"></img>
          </div>

          <div className="upper">
            <h2>{item?.title}</h2>
            <p>{item?.published_date}</p>
            <p>
              {item?.updated && `updated:  `} {item?.updated}
            </p>
            <h3>
              {item?.abstract}
              {`    `}
              <a className="readmore" href={item?.url}>
                Read more...
              </a>
            </h3>
          </div>
        </div>
      ) : (
        <div className="shadowBlock">
          <div className="links">
            <h3>You cannot read this article until you are logged in </h3>

            <Link className="button" to="/">
              Go home
            </Link>
            <Link className="button" to="/login">
              Log in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
