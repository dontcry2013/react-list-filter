import axios from "axios";
import {
  FETCH_PETS_REQUEST,
  FETCH_PETS_SUCCESS,
  FETCH_PETS_FAILURE
} from "./petTypes";

export const fetchPets = (uri) => {
  return (dispatch) => {
    dispatch(fetchPetsRequest());
    return axios
      .get(`${uri}`)
      .then((response) => {
        const pets = response.data;
        dispatch(fetchPetsSuccess(pets));
      })
      .catch((error) => {
        dispatch(fetchPetsFailure(error.message));
      });
  };
};

export const fetchPetsRequest = () => {
  return {
    type: FETCH_PETS_REQUEST
  };
};

export const fetchPetsSuccess = (pets) => {
  return {
    type: FETCH_PETS_SUCCESS,
    payload: pets
  };
};

export const fetchPetsFailure = (error) => {
  return {
    type: FETCH_PETS_FAILURE,
    payload: error
  };
};
