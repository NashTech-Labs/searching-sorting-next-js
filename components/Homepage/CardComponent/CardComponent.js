import React, { useState, useEffect } from "react";
import styles from "./CardComponent.module.scss";
import { useSelector, useDispatch } from "react-redux";

function CardComponent() {
  const cardsData = useSelector((state) => state.spacexData);
  const searchValue = useSelector((state) => state.searchData);
  const filterValue = useSelector((state) => state.filterData);

  const [updateCardsData, setupdateCardsData] = useState([]);

  useEffect(() => {
    if (cardsData.length > 0) {
      setupdateCardsData(cardsData);
    }
  }, [cardsData]);

  useEffect(() => {
    let val = searchValue.toLowerCase();
    let matches = cardsData.filter((v) =>
      v.rocket.rocket_name.toLowerCase().includes(val)
    );
    setupdateCardsData(matches);
  }, [searchValue]);

  useEffect(() => {
    // First Get today Date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    // First Get today date

    if (filterValue === "Last_Week") {
      let matches = cardsData.filter(
        (v) =>
          parseInt(v.launch_date_local.slice(0, 4)) === parseInt(yyyy) &&
          parseInt(v.launch_date_local.slice(5, 7)) === parseInt(mm) &&
          parseInt(v.launch_date_local.slice(8, 10)) <= parseInt(dd) - 7
      );
      setupdateCardsData(matches);
    }

    if (filterValue === "Last_Month") {
      let matches = cardsData.filter(
        (v) =>
          parseInt(v.launch_date_local.slice(0, 4)) === parseInt(yyyy) &&
          parseInt(v.launch_date_local.slice(5, 7)) - 1 === parseInt(mm) - 1
      );
      setupdateCardsData(matches);
    }

    if (filterValue === "Last_Year") {
      let matches = cardsData.filter(
        (v) => parseInt(v.launch_date_local.slice(0, 4)) === parseInt(yyyy) - 1
      );
      setupdateCardsData(matches);
    }

    if (filterValue === "Failure") {
      let matches = cardsData.filter((v) => v.launch_success === false);
      setupdateCardsData(matches);
    }

    if (filterValue === "Success") {
      let matches = cardsData.filter((v) => v.launch_success === true);
      setupdateCardsData(matches);
    }

    if (filterValue === "Upcoming") {
      let matches = cardsData.filter(
        (v) =>
          parseInt(v.launch_date_local.slice(0, 4)) > parseInt(yyyy) &&
          parseInt(v.launch_date_local.slice(5, 7)) > parseInt(mm) &&
          parseInt(v.launch_date_local.slice(8, 10)) > parseInt(dd)
      );
      setupdateCardsData(matches);
    }
  }, [filterValue]);

  return (
    <>
      <section className={`${styles.dark} ${styles.main}`}>
        <div className={`${styles.container} ${styles.py-4}`} >
          <h1 className={`${styles.h1}`} id="pageHeaderTitle">
            Space X
          </h1>
          {/* +++++++++++++++++++++ Cards mapping +++++++++++++++++++++++++++++++ */}
          {updateCardsData.length > 0 ? updateCardsData.map((data, index) => {
            return (
              <div key={index}>
                <article className={`${styles.postcard} ${styles.dark} ${styles.light}`}>
                  <a className={`${styles.postcard__img_link}`}>
                    <img
                      className={`${styles.postcard__img}`}
                      src={
                        data.links.mission_patch ||
                        "https://picsum.photos/1000/1000"
                      }
                      alt="Image Title"
                    />
                  </a>
                  <div className={`${styles.postcard__text}`}>
                    <h1 className={`${styles.postcard__title} ${styles.blue} `}>
                      <a>{data.rocket.rocket_name}</a>
                    </h1>
                    <div className={`${styles.postcard__subtitle} ${styles.small}`}>
                      <time dateTime="2020-05-25 12:00:00">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        {data.launch_date_local.slice(0, 10)}
                      </time>
                    </div>
                    <div className={`${styles.postcard__bar}`}></div>
                    <div className={`${styles.postcard__previewtxt}`}>
                      {data.details ||
                        "This mission will launch the ninth batch of operational Starlink satellites, which are expected to be version 1.0, from LC-39A, Kennedy Space Center. It is the tenth Starlink launch overall. The satellites will be delivered to low Earth orbit and will spend a few weeks maneuvering to their operational altitude of 550 km. This mission is includes a rideshare of two BlackSky satellites on top of the Starlink stack. The booster for this mission is expected to land an ASDS."}
                    </div>
                    <ul className={`${styles.postcard__tagbox}`}>
                      <li className={`${styles.tag__item}`}>
                        <i className={`${styles.fas}`}></i>
                        Mission: {data.mission_name}
                      </li>
                      <li className={`${styles.tag__item}`}>
                        <i className="fas fa-tag mr-2"></i>
                        Launch Status:
                        {data.launch_success === true ? "Successes" : "Failure"}
                      </li>
                    </ul>
                  </div>
                </article>
              </div>
            );
          }) : <div className={styles.noResult} > <h1>No results Found</h1> </div> }
          {/* +++++++++++++++++++++ Cards mapping +++++++++++++++++++++++++++++++ */}
        </div>
      </section>
    </>
  );
}

export default CardComponent;
