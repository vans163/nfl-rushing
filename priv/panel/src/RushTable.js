import React, { useState } from 'react';
import { Card, Table, Button, Modal, Select, Checkbox } from 'antd';

import { useGlobalState, setGlobalState, getState2 } from './state/state';
import { apiLoadTable } from './api/api';

const { Option } = Select;

const columns = [
  {
    title: 'Player',
    dataIndex: 'Player',
    key: 'Player',
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

	var playerCount = 0
    return <div>
      <Button type="primary">{`Players: ${playerCount}`}</Button>
      <Button type="primary" onClick={()=> apiLoadTable()}>Load</Button>
      <br/>
      <br/>
    	<Table rowKey={"Player"} bordered size={"small"}
        onChange={(pagination, filters, sorter)=> {
          setFilteredInfo(filters)
        }}
        pagination={{ pageSize: 50 }} dataSource={sl.rushing} columns={columns} />
    </div>;
}
