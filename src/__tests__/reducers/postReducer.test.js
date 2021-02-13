import postReducer from '../../redux/post/postReducer';
import * as postTypes from "../../redux/post/postTypes";

const DEFAULT_STATE = {
  loading: false,
  posts: [],
  error: ""
};

const data = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
]

describe("Post Reducer", () => {
  test("should return default state when state is undefined", () => {
    expect(postReducer(undefined, { type: "DUMMY_ACTION" })).toEqual(DEFAULT_STATE);
  })

  test("should return expected state for FETCH_POST_REQUEST action type", () => {
    const action = {
      type: postTypes.FETCH_POST_REQUEST,
    }
    const expectedState = {
      loading: true,
      posts: [],
      error: ""
    }
    expect(postReducer(DEFAULT_STATE, action)).toEqual(expectedState);
  })

  test("should return expected state for FETCH_POST_SUCCESS action type", () => {
    const action = {
      type: postTypes.FETCH_POST_SUCCESS,
      payload: data,
    }
    const expectedState = {
      loading: false,
      posts: data,
      error: ""
    }
    expect(postReducer(DEFAULT_STATE, action)).toEqual(expectedState);
  })

  test("should return expected state for FETCH_POST_FAILURE action type", () => {
    const action = {
      type: postTypes.FETCH_POST_FAILURE,
      payload: 'error message',
    }
    const expectedState = {
      loading: false,
      posts: [],
      error: 'error message',
    }
    expect(postReducer(DEFAULT_STATE, action)).toEqual(expectedState);
  })

  test("should return expected state for FETCH_POST_FAILURE action type", () => {
    const previousState = {
      loading: false,
      posts: data,
      error: ""
    }
    const action = {
      type: postTypes.FETCH_POST_FAILURE,
      payload: 'error message',
    }
    const expectedState = {
      loading: false,
      posts: [],
      error: 'error message',
    }
    expect(postReducer(previousState, action)).toEqual(expectedState);
  })

  test("should return previous state when type is DUMMY_ACTION", () => {
    const previousState = {
      loading: false,
      posts: data,
      error: ""
    }
    expect(postReducer(previousState, { type: "DUMMY_ACTION" })).toEqual(previousState);
  })
})
