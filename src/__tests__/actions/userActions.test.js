import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from '../../redux/user/userTypes';
import * as actions from '../../redux/user/userActions';
import { URL_TEST } from '../../Constants';

const mockedResponse = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
]
const mock = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);
const DEFAULT_STATE = {
  loading: false,
  users: [],
  error: ""
};
const store = mockStore(DEFAULT_STATE);

describe("User Action Creators", () => {
  test("fetch users request", () => {
    const expectedAction = {
      type: FETCH_USERS_REQUEST,
    }
    expect(actions.fetchUsersRequest()).toEqual(expectedAction);
  })

  test("fetch users success", () => {
    const expectedAction = {
      type: FETCH_USERS_SUCCESS,
      payload: mockedResponse,
    }
    expect(actions.fetchUsersSuccess(mockedResponse)).toEqual(expectedAction);
  })

  test("fetch users failure", () => {
    const expectedAction = {
      type: FETCH_USERS_FAILURE,
      payload: 'error message',
    }
    expect(actions.fetchUsersFailure('error message')).toEqual(expectedAction);
  })

  test("fetchUsers action creator return expected action", () => {
    mock
      .onGet("/users")
      .reply(200, mockedResponse)
    store.dispatch(actions.fetchUsers(URL_TEST))
      .then(() => {
        const mActions = store.getActions();
        expect(mActions[0]).toEqual({ type: 'FETCH_USERS_REQUEST' });
        expect(mActions[1].payload).toEqual(mockedResponse);
      })
  })
})
