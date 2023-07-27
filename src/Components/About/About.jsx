import React from "react";
import note from "../../images/note.png";
import styles from "./About.module.css";
import { useNavigate } from "react-router-dom";
export default function About() {
  const navigate = useNavigate();
  function goToLogin() {
    navigate("/login");
  }
  return (
    <>
      <div className={styles.landing}>
        <div className={`${styles.container} container p-5  `}>
          <div className="row justify-content-center align-items-center ">
            <div className="col-md-5 d-flex justify-content-center align-items-center ">
              <div className="title">
                <h1 className="fw-bold">
                  What is{" "}
                  <span className={`fw-bolder ${styles.color}`}>
                    Sticky Notes
                  </span>
                  ?{" "}
                </h1>
                <p>
                  It's a simple, easy-to-use, absolutely free, fast and
                  efficient note taking software
                </p>
                <button
                  onClick={goToLogin}
                  className={`  fw-bold ${styles.button_color}`}
                >
                  GET STARTED{" "}
                </button>
              </div>
            </div>
            <div
              className={`col-md-7 d-flex justify-content-center align-items-center  `}
            >
              <img
                src={note}
                className={` ${styles.image} pe-5 image-fluid `}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
