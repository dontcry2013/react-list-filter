import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Modal } from 'antd';
import { userColumns } from "../columns/userColumns";
import { fetchUsers } from "../redux/user";
import { fetchPosts } from "../redux/post";
import PostsTable from './PostsTable';
import { URL_PRO } from '../Constants';

const crawl = (user, allValues) => {
  if (!allValues) {
    allValues = [];
  }
  for (const key in user) {
    if (typeof user[key] === "object") {
      crawl(user[key], allValues);
    } else {
      allValues.push(`${user[key]} `);
    }
  }
  return allValues;
};
const getUsersSearchIndex = (users) => {
  return users.map(user => {
    const allValues = crawl(user);
    return { allValues: allValues.toString() };
  });
}
const { Search } = Input;
export default () => {
  const dispatch = useDispatch();
  const tableState = useSelector((state) => state.user);
  const [searchVal, setSearchVal] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers(URL_PRO));
  }, [URL_PRO]);

  useEffect(() => {
    if (tableState && tableState.users) {
      setFilteredData(tableState.users);
      const searchInd = getUsersSearchIndex(tableState.users)
      setSearchIndex(searchInd);
    }
  }, [tableState]);

  useEffect(() => {
    if (tableState && tableState.users) {
      if (searchVal) {
        // firstly, we get an array with target object and replace unwanted with null
        const reqData = searchIndex.map((user, index) => {
          return user.allValues.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
            ? tableState.users[index]
            : null;
        });
        // secondly, remove null from array and set to table
        setFilteredData(
          reqData.filter(user => {
            return !!user;
          })
        );
      } else {
        setFilteredData(tableState.users);
      }
    }
  }, [searchVal, tableState]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Search
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{
          position: "sticky",
          top: "0",
          left: "0",
          width: "200px",
          margin: "2vh"
        }}
      />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={userColumns}
        loading={tableState.loading}
        pagination={false}
        style={{
          margin: "2vh"
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              setIsModalVisible(true);
              dispatch(fetchPosts(URL_PRO, record.id));
            },
          };
        }}
      />
      <Modal
        title="Posts"
        width={1000}
        style={{ top: 20 }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        >
        <PostsTable />
      </Modal>
    </div>
  )
}
