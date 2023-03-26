import * as types from "./types";

export const spaceXData = (data) => ({
  type: types.spacexData,
  payload: data,
});

export const SearchData = (data) => ({
  type: types.Search_Data,
  payload: data,
});

export const filterValue = (data) => ({
  type: types.filter_Value,
  payload: data,
});
