import React, { useEffect, useState } from "react";
import NavAlbums from "./NavAlbums";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [apiData, setData] = useState([]);
  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=12")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log(apiData);
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccessMsg] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const closeModal = (e) => {
      if (e.path[0].tagName !== "BUTTON") {
        setOpenModal(false);
        setSuccessMsg(false);
      }
    };
    document.body.addEventListener("click", closeModal);

    return () => document.body.removeEventListener("click", closeModal);
  });

  return (
    <div>
      <NavAlbums />
      {openModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-body">
              <span className="createm">Create new album</span>
              <span className="addm">Add to existing</span>
              <h3 className="modal-title">Enter title here</h3>
            </div>
            <div className="modal-footer">
              <button className="cancel" onClick={() => setOpenModal(false)}>
                cancel
              </button>
              <button
                className="save"
                onClick={() => {
                  setOpenModal(false);
                  setSuccessMsg(true);
                }}
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="grid">
        {apiData.map((item) => {
          return (
            <div key={item.id} className={"item" + item.id}>
              {" "}
              <img
                src={item.download_url}
                alt=""
                onClick={() => navigate(`/details/${item.id}`)}
              />
              <button className="over-btn" onClick={() => setOpenModal(true)}>
                Add to album
              </button>
            </div>
          );
        })}
      </div>
      {success && <div className="footer-msg">This is a success message!</div>}
    </div>
  );
}
