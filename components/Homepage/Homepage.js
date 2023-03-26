import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { spaceXData } from "../../redux/action/actionCreators";
import CardComponent from "./CardComponent/CardComponent";
import Header from "../Header/Header";

function Homepage() {
  const dispatch = useDispatch();

  const fetchAPI = async () => {
    await fetch("https://api.spacexdata.com/v3/launches")
      .then((response) => response.json())
      .then((data) => {
        dispatch(spaceXData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <Header />
      <CardComponent />
    </>
  );
}

export default Homepage;
