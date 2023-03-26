import React, { useState } from "react";
import styles from './Header.module.css'
import { useSelector, useDispatch } from "react-redux";
import { SearchData, filterValue } from "../../redux/action/actionCreators";

function Header() {
  const dispatch = useDispatch();

  const [searchValue, setsearchValue] = useState("");

  const [dropdownValue, setdropdownValue] = useState("");

  const searchText = (value) => {
    setsearchValue(value);
    dispatch(SearchData(value));
  };

  const dropdownText = (value) => {
    setdropdownValue(value);
    dispatch(filterValue(value));
  };

  return (
    <div className={styles.topnav}>
      <a className={styles.active}>Home</a>
      <input
        value={searchValue}
        onChange={(e) => searchText(e.target.value)}
        type="text"
        placeholder="Search rocket by name..."
      />

      {/* Filetr  */}
      <select
        className={styles.headerdropdown}
        value={dropdownValue}
        onChange={(e) => dropdownText(e.target.value)}
      >
        {/* <option value="Last_Week">Last Week</option>
        <option value="Last_Month">Last Month</option>
        <option value="Last_Year">Last Year</option> */}
        <option value="Failure">Failure</option>
        <option value="Success">Success</option>
        <option value="Upcoming">Upcoming</option>
      </select>
      {/* Filter */}
    </div>
  );
}

export default Header;
