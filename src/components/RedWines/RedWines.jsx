import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//api
import { WINES_URL } from "../../api/api";
//styles
import styles from "./styles.module.css";

const RedWines = () => {
  const [wines, setWines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [visiblePages, setVisiblePages] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getWines = async () => {
    try {
      const response = await axios.get(`${WINES_URL}/reds`);
      const getData = await response.data;

      setWines(getData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWines();
  }, []);

  // Рассчет диапазон индексов для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWines = wines.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(wines.length / itemsPerPage);

  useEffect(() => {
    updateVisiblePages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalPages])

  const updateVisiblePages = () => {
    let startPage = currentPage - 5 > 0 ? currentPage - 5 : 1;
    let endPage = startPage + 9 < totalPages ? startPage + 9 : totalPages;

    setVisiblePages(
      Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      )
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>List of Red wines</h1>
      <div className={styles.item}>
        <div className={styles.image_items}>
          {currentWines.map((item) => (
            <Link
              to={`/reds/${item.id}`}
              key={item.id}
              className={styles.item_box}
            >
              <div className={styles.image_box}>
                <img src={item.image} alt="NOT IMAGE" />
              </div>
              <div className={styles.imagebox_body}>
                <h2 className={styles.winery}>{item.winery}</h2>
                <ul className={styles.lists}>
                  <li className={styles.list}>
                    <b>Average:</b> {item.rating.average}
                  </li>
                  <li className={styles.list}>
                    <b>Reviews:</b> {item.rating.reviews}
                  </li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.pagination}>
        <span onClick={handlePrev} className={styles.pageNumber}>
          {"<"}
        </span>
        {visiblePages.map((page) => (
          <span
            key={page}
            onClick={() => paginate(page)}
            className={page === currentPage ? styles.active : styles.pageNumber}
          >
            {page}
          </span>
        ))}
        <span onClick={handleNext} className={styles.pageNumber}>
          {">"}
        </span>
      </div>
    </div>
  );
};

export default RedWines;
