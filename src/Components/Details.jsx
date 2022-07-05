import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavAlbums from "./NavAlbums";

export default function Details(props) {
  let { id } = useParams();
  let [imageDetail, setImageDetail] = useState([]);
  useEffect(() => {
    fetch(`https://picsum.photos/id/${id}/info`)
      .then((res) => res.json())
      .then((data) => setImageDetail(data));
  }, []);
  const date = new Date();
  

  return (
    <div>
      <NavAlbums />
      <div className="buttons">
        <button className="add">Add to album +</button>
        <button className="download">Download</button>
      </div>
      <img src={imageDetail.download_url} alt="" className="img-detail" />
      <p className="p1">Uploaded by</p>
      <p className="p2">{imageDetail.author}</p>
      <small>
        {date.getDay() +
          "th" +
          " " +
          date.toLocaleString("default", { month: "long" }) +
          " " +
          date.getFullYear()}
      </small>
      <div className="link">
        <Link to={"/home"} className="goBack">
          Go back
        </Link>
      </div>
    </div>
  );
}
