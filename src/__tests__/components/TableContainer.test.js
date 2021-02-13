import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import rootReducer from '../../redux/rootReducer';
import TableContainer from '../../components/TableContainer';
import { userColumns } from '../../columns/userColumns';

let wrapper;
const titles = userColumns.map(val => val.title)

describe('<TableContainer /> unit test', () => {
  beforeAll(() => {
    const mockStore = createStore(rootReducer, applyMiddleware(thunk));
    const getWrapper = () => mount(
      <Provider store={mockStore}>
        <TableContainer />
      </Provider>
    );
    wrapper = getWrapper();
  })

  test('HTML dom should exist', () => {
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('Table').length).toBe(2);
  })

  test('Table titles should equal with configuration file', () => {
    expect(wrapper.find('Table').at(0).find('th').at(0).text()).toBe(titles[0]);
    expect(wrapper.find('Table').at(0).find('th').at(1).text()).toBe(titles[1]);
    expect(wrapper.find('Table').at(0).find('th').at(2).text()).toBe(titles[2]);
    expect(wrapper.find('Table').at(0).find('th').at(3).text()).toBe(titles[3]);
  })
});
