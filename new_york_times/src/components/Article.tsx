import React from "react";
import { useSelector } from "react-redux";
import articles from "../redux/reducers/articles";
import articleImg from "../resourses/img/article.jpg";
import { Link } from "react-router-dom";

export default function Article(props: any) {
  return (
    <div className="block">
      <Link to={`/page/${props.media.title}`}>
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
