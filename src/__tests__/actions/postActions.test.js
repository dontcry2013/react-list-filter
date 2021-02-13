import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from '../../redux/post/postActions';
import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
} from '../../redux/post/postTypes';
import { URL_TEST } from '../../Constants';

const mock = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);
const DEFAULT_STATE = {
  loading: false,
  posts: [],
  error: ""
}
const store = mockStore(DEFAULT_STATE);

describe("Post Action Creators", () => {
  test("fetch posts request", () => {
    const expectedAction = {
      type: FETCH_POST_REQUEST,
    }
    expect(actions.fetchPostsRequest()).toEqual(expectedAction);
  })

  test("fetch posts success", () => {
    const expectedAction = {
      type: FETCH_POST_SUCCESS,
      payload: [],
    }
    expect(actions.fetchPostsSuccess([])).toEqual(expectedAction);
  })

  test("fetch posts failure", () => {
    const expectedAction = {
      type: FETCH_POST_FAILURE,
      payload: 'error message',
    }
    expect(actions.fetchPostsFailure('error message')).toEqual(expectedAction);
  })

  test("fetchPosts action creator return expected action", () => {
    const mockedResponse = [
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
    mock
      .onGet("/posts?userId=1")
      .reply(200, mockedResponse)
    store.dispatch(actions.fetchPosts(URL_TEST, 1))
      .then(() => {
        const mActions = store.getActions();
        expect(mActions[0]).toEqual({ type: 'FETCH_POST_REQUEST' });
        expect(mActions[1].payload).toEqual(mockedResponse);
      })
  })
})
