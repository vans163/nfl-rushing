import React, { useState } from 'react';
import { Card, Table, Button, Modal, Select, Checkbox, Input, Icon } from 'antd';

import { useGlobalState, setGlobalState, getState2 } from './state/state';
import { apiLoadTable } from './api/api';
import { downloadCSV } from './api/csv';

const { Option } = Select;

const handleSearch = (selectedKeys, confirm) => {
  confirm();
};
const handleReset = (clearFilters) => {
  clearFilters();
};

const columns = [
  {
    title: 'Player',
    dataIndex: 'Player',
    key: 'Player',
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search player`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record["Player"]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
  },
  {
    title: 'Team',
    dataIndex: 'Team',
    key: 'Team',
  },
  {
    title: 'Pos',
    dataIndex: 'Pos',
    key: 'Pos',
  },
  {
    title: 'Att',
    dataIndex: 'Att',
    key: 'Att',
  },
  {
    title: 'Att/G',
    dataIndex: 'Att/G',
    key: 'Att/G',
  },
  {
    title: 'Yrds',
    dataIndex: 'Yds',
    key: 'Yds',
    sorter: (a, b) => {
      return a["Yds"]- b["Yds"]
    },
  },
  {
    title: 'Avg',
    dataIndex: 'Avg',
    key: 'Avg',
  },
  {
    title: 'Yds/G',
    dataIndex: 'Yds/G',
    key: 'Yds/G',
  },
  {
    title: 'TD',
    dataIndex: 'TD',
    key: 'TD',
    sorter: (a, b) => {
      return a["TD"] - b["TD"]
    },
  },
  {
    title: 'Lng',
    dataIndex: 'Lng',
    key: 'Lng',
    sorter: (a, b) => {
      return parseInt(a["Lng"]) - parseInt(b["Lng"])
    },
  },
  {
    title: '1st',
    dataIndex: '1st',
    key: '1st',
  },
  {
    title: '1st%',
    dataIndex: '1st%',
    key: '1st%',
  },
  {
    title: '20+',
    dataIndex: '20+',
    key: '20+',
  },
  {
    title: '40+',
    dataIndex: '40+',
    key: '40+',
  },
  {
    title: 'FUM',
    dataIndex: 'FUM',
    key: 'FUM',
  },
]

export const RushTable = () => {
  var [sl] = useGlobalState("local");
  var filteredInfo = sl.filteredInfo || [];

  var setFilteredInfo = function(filters) {
    setGlobalState('local', v => { return {...v, filteredInfo: filters} })
  }
  var setFilteredData = function(data) {
    setGlobalState('local', v => { return {...v, filteredData: data} })
  }

  var filteredData = sl.filteredData?sl.filteredData:sl.rushing
  if (!filteredData)
    filteredData = []

  var playerCount = filteredData.length
  return <div>
    <Button type="primary">{`Players: ${playerCount}`}</Button>
    <Button type="primary" onClick={()=> apiLoadTable()}>Load</Button>
    <Button type="primary" onClick={()=> downloadCSV(filteredData)}>Download CSV</Button>
    <br/>
    <br/>
    <Table rowKey={"Player"} bordered size={"small"}
      onChange={(pagination, filters, sorter, extra)=> {
        setFilteredData(extra.currentDataSource)
        setFilteredInfo(filters)
      }}
      pagination={{ pageSize: 50 }} dataSource={sl.rushing} columns={columns} />
  </div>;
}
