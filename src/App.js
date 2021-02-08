import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(2);
  const countPerPage = 12;

  const getUserList = async page => {
    console.log(page);
    const pages = page ? page : 1;
    await axios
      .get(
        `https://reqres.in/api/users?page=${pages}&per_page=${countPerPage}&delay=1`
      )
      .then(res => {
        setUsers(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handlePerRowsChange = async (newPerPage, page) => {
    getUserList(page, newPerPage);
    // setPerPage(newPerPage);
  };

  const getData = users.map(row => ({
    key: row.id,
    avatar: (
      <img height='30px' width='30px' alt={row.first_name} src={row.avatar} />
    ),
    fname: row.first_name,
    lname: row.last_name,
    email: row.email,
  }));

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
    },
    {
      title: 'First Name',
      dataIndex: 'fname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys({ selectedRowKeys });
  };

  const rowSelection = {
    ...selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Table
      columns={columns}
      dataSource={getData}
      onChangeRowsPerPage={handlePerRowsChange}
      pagination={{
        defaultPageSize: 4,
        pageSizeOptions: ['5', '10', '20'],
        showSizeChanger: true,
      }}
    />
  );
}

export default App;
