import { userPostCollections } from "../action/actionCreators";
import * as types from "../action/types";

const initialState = {
  spacexData: [],
  searchData: "",
  filterData: "",
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.spacexData:
      return { ...state, spacexData: action.payload };
    case types.Search_Data:
      return { ...state, searchData: action.payload };
    case types.filter_Value:
      return { ...state, filterData: action.payload };
    default:
      return state;
  }
};
