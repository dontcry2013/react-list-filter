import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, Row } from 'antd';
import postColumns from '../columns/postColumns';

export default () => {
  const postSelected = useSelector((state) => state.post);
  const [postState, setPostState] = useState({ loading: false, posts: [] });

  useEffect(() => {
    setPostState(postSelected);
  }, [postSelected]);

  return (
    <Row>
      <Table
        rowKey="title"
        dataSource={postState.posts}
        columns={postColumns}
        loading={postState.loading}
        pagination={false}
      />
    </Row>
  )
}
