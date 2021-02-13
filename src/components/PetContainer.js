import React, { useState, useEffect } from 'react';
import {
  Divider, Input, Select, Space
} from 'antd';
import { URL_PET_MEL, URL_PET_SYD } from '../Constants';
import { useFetch } from '../hooks/useFetch';
import PetTable from './PetTable';

const { Search } = Input;
const { Option } = Select;

export default () => {
  const [maleState, setMaleState] = useState([]);
  const [femaleState, setFemaleState] = useState([]);
  const [searchVal, setSearchVal] = useState(null);
  const [filteredInfo, setFilteredInfoData] = useState({});

  const melData = useFetch(URL_PET_MEL);
  const sydData = useFetch(URL_PET_SYD);

  useEffect(() => {
    if (melData && melData.data) {
      const malePets = [];
      const femalePets = [];
      melData.data.forEach(item => {
        const user = { ...item, city: 'Melbourne' };
        delete user.pets;
        if (user.gender === 'Male') {
          item.pets && item.pets.forEach((pet) => {
            malePets.push({ ...user, petName: pet.name, petType: pet.type })
          })
        } else {
          item.pets && item.pets.forEach((pet) => {
            femalePets.push({ ...user, petName: pet.name, petType: pet.type })
          })
        }
      })
      setMaleState([...maleState, ...malePets]);
      setFemaleState([...femaleState, ...femalePets]);
    }
  }, [melData]);

  useEffect(() => {
    if (sydData && sydData.data) {
      const malePets = [];
      const femalePets = [];
      sydData.data.forEach(item => {
        const user = { ...item, city: 'Sydney' };
        delete user.pets;
        if (user.gender === 'Male') {
          item.pets && item.pets.forEach((pet) => {
            malePets.push({ ...user, petName: pet.name, petType: pet.type })
          })
        } else {
          item.pets && item.pets.forEach((pet) => {
            femalePets.push({ ...user, petName: pet.name, petType: pet.type })
          })
        }
      })
      setMaleState([...maleState, ...malePets]);
      setFemaleState([...femaleState, ...femalePets]);
    }
  }, [sydData]);

  return (
    <div>
      <Space
        style={{
          position: "sticky",
          top: "0",
          left: "0",
          margin: "2vh"
        }}
      >
        <Search
          onChange={(e) => {
            console.log(e.target.value);
            setSearchVal([e.target.value]);
          }}
          placeholder="Search"
          enterButton
          style={{
            width: "200px",
          }}
        />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a city"
          onChange={(value) => {
            setFilteredInfoData({ ...filteredInfo, city: [value] || null });
          }}
        >
          <Option value=""></Option>
          <Option value="Melbourne">Melbourne</Option>
          <Option value="Sydney">Sydney</Option>
        </Select>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a pet type"
          onChange={(value) => setFilteredInfoData({ ...filteredInfo, petType: [value] || null })}
        >
          <Option value=""></Option>
          <Option value="Cat">Cat</Option>
          <Option value="Dog">Dog</Option>
        </Select>
      </Space>
      <Divider orientation="left">Male</Divider>
      <PetTable
        loading={melData.loading || sydData.loading}
        searchVal={searchVal}
        filteredInfo={filteredInfo}
        maleState={maleState}
      />
      <Divider orientation="left">Female</Divider>
      <PetTable
        loading={melData.loading || sydData.loading}
        searchVal={searchVal}
        filteredInfo={filteredInfo}
        maleState={femaleState}
      />
    </div>
  )
}
