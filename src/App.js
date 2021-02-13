import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import rootReducer from './redux/rootReducer';
// import TableContainer from './components/TableContainer';
import PetContainer from './components/PetContainer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      {/* <TableContainer /> */}
      <PetContainer />
    </Provider>
  );
}
