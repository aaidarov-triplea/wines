import axios from "axios";
//router
import { useParams } from "react-router-dom";
//hooks
import { useEffect, useState } from "react";
//api
import { WINES_URL } from "../../api/api";

import styles from "./styles.module.css";

const RedWine = () => {
  const { id } = useParams();
  const [wine, setWine] = useState([]);

  const getId = async () => {
    const response = await axios.get(`${WINES_URL}/reds/${id}`);
    const getId = response.data;

    setWine(getId);
  };

  useEffect(() => {
    getId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wine}>
      <a href="/reds" className={styles.backto}>
        Back to lists
      </a>
      <div className={styles.item}>
        <div className={styles.image_box}>
          <img src={wine.image} alt="NOT IMAGE" />
        </div>
        <div className={styles.item_body}>
          <h2 className={styles.winery}>{wine.winery}</h2>
          <ul className={styles.lists}>
            <li className={styles.list}>
              <strong>Wine:</strong> {wine.wine}
            </li>
            <li className={styles.list}>
              <strong>Location:</strong>{" "}
              {wine.location ? wine.location : "Confidentially"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RedWine;
