import axios from "axios";
import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
} from './postTypes';

export const fetchTestPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    return axios
      .get("/posts?userId=1")
      .then((response) => {
        const posts = response.data;
        dispatch(fetchPostsSuccess(posts));
      })
      .catch((error) => {
        console.log(error)
        dispatch(fetchPostsFailure(error.message));
      });
  };
};
export const fetchPosts = (uri, userId) => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    return axios
      .get(`${uri}/posts?userId=${userId}`)
      .then((response) => {
        const posts = response.data;
        dispatch(fetchPostsSuccess(posts));
      })
      .catch((error) => {
        dispatch(fetchPostsFailure(error.message));
      });
  };
};

export const fetchPostsRequest = () => {
  return {
    type: FETCH_POST_REQUEST
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_POST_SUCCESS,
    payload: posts
  };
};

export const fetchPostsFailure = (error) => {
  return {
    type: FETCH_POST_FAILURE,
    payload: error
  };
};
