import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

export default ({
  loading, searchVal, filteredInfo, maleState,
}) => {
  const [colFilters, setColFilters] = useState(filteredInfo);

  useEffect(() => {
    setColFilters(filteredInfo);
  }, [filteredInfo]);

  const petColumns = [
    {
      title: "Name",
      dataIndex: "petName",
      key: "petName",
      sorter: (a, b) => {
        return a.petName.localeCompare(b.petName)
      },
      filteredValue: searchVal,
      onFilter: (value, record) => {
        return record.petName.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      filters: [
        { text: 'Melbourne', value: 'Melbourne' },
        { text: 'Sydney', value: 'Sydney' },
      ],
      filteredValue: colFilters.city,
      onFilter: (value, record) => record.city.includes(value),
    },
    {
      title: "",
      dataIndex: "type",
      key: "type",
      filteredValue: colFilters.petType,
      onFilter: (value, record) => {
        return record.petType.includes(value)
      },
      render: (text, record) => null,
    },
  ];

  const handleMaleTableChange = (filters) => {
    setColFilters(filters)
  };

  return (
    <div>
      <Table
        rowKey="petName"
        dataSource={maleState}
        columns={petColumns}
        loading={loading}
        pagination={false}
        onChange={(pagination, filters, sorter) => {
          handleMaleTableChange(filters);
        }}
        style={{
          margin: "2vh"
        }}
      />
    </div>
  )
}
