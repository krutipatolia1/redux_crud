import { useState, useEffect } from "react";
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from "react-redux";
import { userEdit } from "../Redux/AddUser/action";
import { Form, Input, DatePicker } from 'antd';
import moment from 'moment';


const EditUser = (props) => {
    const { isModalVisible, setIsModalVisible, editUser } = props;
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const userData = useSelector((state) =>
        state?.users?.users.find((user) => user.id === editUser.id)
    );

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinish = (values) => {
        values.id = userData?.id
        dispatch(userEdit(values))
        handleCancel()
        form.resetFields();
    };


    return (
        <>
            <Modal title="Basic Modal"
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        firstName: userData?.firstName,
                        lastName: userData?.lastName,
                        email: userData?.email,
                        contactNumber: userData?.contactNumber,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="FirstName"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your firstName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="LastName"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your lastName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Contact Number"
                        name="contactNumber"
                        rules={[{ required: true, message: 'Please input your contactNumber!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 12, span: 5 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default EditUser;