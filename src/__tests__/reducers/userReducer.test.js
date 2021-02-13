import userReducer from '../../redux/user/userReducer';
import * as userTypes from "../../redux/user/userTypes";

const DEFAULT_STATE = {
  loading: false,
  users: [],
  error: ""
};

const data = [
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

describe("User Reducer", () => {
  test("should return default state when state is undefined", () => {
    expect(userReducer(undefined, { type: "DUMMY_ACTION" })).toEqual(DEFAULT_STATE);
  })

  test("should return expected state for FETCH_USERS_REQUEST action type", () => {
    const action = {
      type: userTypes.FETCH_USERS_REQUEST,
    }
    const expectedState = {
      loading: true,
      users: [],
      error: ""
    }
    expect(userReducer(DEFAULT_STATE, action)).toEqual(expectedState);
  })

  test("should return expected state for FETCH_USERS_SUCCESS action type", () => {
    const action = {
      type: userTypes.FETCH_USERS_SUCCESS,
      payload: data,
    }
    const expectedState = {
      loading: false,
      users: data,
      error: ""
    }
    expect(userReducer(DEFAULT_STATE, action)).toEqual(expectedState);
  })

  test("should return expected state for FETCH_USERS_FAILURE action type", () => {
    const action = {
      type: userTypes.FETCH_USERS_FAILURE,
      payload: 'error message',
    }
    const expectedState = {
      loading: false,
      users: [],
      error: 'error message',
    }
    expect(userReducer(DEFAULT_STATE, action)).toEqual(expectedState);
  })

  test("should return expected state for FETCH_USERS_FAILURE action type", () => {
    const previousState = {
      loading: false,
      users: data,
      error: ""
    }
    const action = {
      type: userTypes.FETCH_USERS_FAILURE,
      payload: 'error message',
    }
    const expectedState = {
      loading: false,
      users: [],
      error: 'error message',
    }
    expect(userReducer(previousState, action)).toEqual(expectedState);
  })

  test("should return previous state when type is DUMMY_ACTION", () => {
    const previousState = {
      loading: false,
      users: data,
      error: ""
    }
    expect(userReducer(previousState, { type: "DUMMY_ACTION" })).toEqual(previousState);
  })
})
