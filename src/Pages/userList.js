import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EditUser from "../Component/editUser";
import { deleteAll, userDelete } from "../Redux/AddUser/action";
import { Table, Space, Button } from 'antd';

const UserList = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editUser, setEditUser] = useState('')
    const [sortedInfo, setSortedInfo] = useState(null)

    const handleDelete = useCallback(
        (record) => dispatch(userDelete({ id: record.id, firstName: record.firstName, lastName: record.lastName, email: record.email, contactNumber: record.contactNumber, dob: record.dob })),
        [dispatch]
    )

    const handleEdit = (record) => {
        setIsModalVisible(true);
        setEditUser({ id: record.id, firstName: record.firstName, lastName: record.lastName, email: record.email, contactNumber: record.contactNumber, dob: record.dob })
    }

    const handleDeleteAll = useCallback(
        () => dispatch(deleteAll()),
        [dispatch]
    )

    function handleChange(pagination, filters, sorter, extra) {
        setSortedInfo(sorter);
    }

    const columns = [
        {
            title: 'Profile',
            dataIndex: 'image',
            key: 'image',
            render: (record) =>
                < div > <img alt="not fount" style={{ width: "50px", height: "50px", borderRadius: "50px" }} src={record} /></div>,
        },
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName',
            render: text => <a>{text}</a>,
            sorter: (a, b) => a.firstName.length - b.firstName.length,
            sortOrder: sortedInfo?.columnKey === 'firstName' && sortedInfo.order,
            ellipsis: true,

        },
        {
            title: 'LasttName',
            dataIndex: 'lastName',
            key: 'lastName',
            render: text => <a>{text}</a>,
            sorter: (a, b) => a.lastName.length - b.lastName.length,
            sortOrder: sortedInfo?.columnKey === 'lastName' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: text => <a>{text}</a>,
            sorter: (a, b) => a.email.length - b.email.length,
            sortOrder: sortedInfo?.columnKey === 'email' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
            render: text => <a>{text}</a>,
            sorter: (a, b) => a.contactNumber - b.contactNumber,
            sortOrder: sortedInfo?.columnKey === 'contactNumber' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'dob',
            key: 'dob',
            render: text => <a>{text}</a>,
            sorter: (a, b) => new Date(a.dob) - new Date(b.dob),
            sortOrder: sortedInfo?.columnKey === 'dob' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => { handleDelete(record) }}>Delete</Button>
                    <Button onClick={() => { handleEdit(record) }}>Edit</Button>
                </Space>
            ),
        },
    ];

    return (

        <div className="container">
            <div className="row">
                <h1>Redux CRUD</h1>
            </div>
            <div className="row" style={{ marginLeft: "70%" }}>
                <div class="col-sm-12 text-center">
                    <Link to="/add-user">
                        <Button type="primary" className="button-primary">Add user</Button>
                    </Link>
                    <Button type="primary" danger
                        onClick={() => { handleDeleteAll() }}
                        className="button-primary"
                    >
                        Delete All
                    </Button>
                </div>
            </div>
            <div style={{ marginTop: 20 }}>
                <Table columns={columns}
                    dataSource={users?.users}
                    pagination={{ pageSizeOptions: ['5', '10'], showSizeChanger: true }}
                    onChange={handleChange} />
            </div>
            <EditUser
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                editUser={editUser}
            />
        </div>
    );
}

export default UserList;