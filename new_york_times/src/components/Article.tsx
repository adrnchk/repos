import React from "react";
import articleImg from "../resourses/img/article.jpg";
import { Link } from "react-router-dom";

export default function Article(props: any) {
  return (
    <div className="block">
      <Link to={`/page/${props.media.id}`}>
        <div className="shadow">
          <img
            className="block__image"
            src={props.media.img ? props.media.img : articleImg}
            alt="img"
          ></img>
        </div>

        <p className="title">{props.media.title}</p>
      </Link>
    </div>
  );
}
