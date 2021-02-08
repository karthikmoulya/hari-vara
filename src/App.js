import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [total, setTotal] = useState();
  const [totalPages, setTotalPages] = useState();

  const getUserList = async (page, count) => {
    await axios
      .get(`https://reqres.in/api/users?page=${page}&per_page=${count}`)
      .then(res => {
        console.log(res.data);
        setPerPage(res.data.per_page);
        setUsers(res.data.data);
        setPage(res.data.page);
        setTotal(res.data.total);
        setTotalPages(res.data.total_pages);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserList(page, total);
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
        defaultPageSize: perPage,
        pageSizeOptions: ['5', '10', '20'],
        showSizeChanger: true,
        onChange: page => setPage(page),
      }}
    />
  );
}

export default App;
