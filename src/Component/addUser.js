import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userAdded } from "../Redux/AddUser/action";
import { Form, Input, Button, DatePicker, Upload } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

export const emailValidator = (text) => {
    text = text.trim();
    const regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regEx.test(text);
};
export const onlyChar = (text) => {
    text = text.trim();
    const regEx = (/[^A-Za-z]/);
    return regEx.test(text);
};
const AddUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();
    const [validateFieldsName, setValidateFieldsName] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null)

    const usersAmount = useSelector((state) => state.users);

    const handleValidateFieldNames = (name) => {
        const isFieldName = validateFieldsName.find(
            (fieldName) => fieldName === name
        );
        if (isFieldName) return 'onChange';
        return 'onBlur';
    };
    const onFinish = (values) => {
        const value = {
            ...values,
            "id": usersAmount.length === 0 ? 1 : usersAmount.users.length + 1,
            'dob': values['dob'].format('YYYY-MM-DD'),
            "image": URL.createObjectURL(selectedFile)
        };
        dispatch(userAdded(value))
        localStorage.setItem('usersdata', JSON.stringify(usersAmount.users))
        history.push("/");
        form.resetFields();
    };

    return (
        <div className="container">
            <div className="row">
                <h1>Add user</h1>
            </div>
            <div>
                {selectedFile && (
                    <div>
                        <img alt="not fount" width={"150px"} src={URL.createObjectURL(selectedFile)} />
                        <br />
                        <button onClick={() => setSelectedFile(null)}>Remove</button>
                    </div>
                )}
                <br />
                <input style={{ marginLeft: '15%' }} type="file" name="myImage" onChange={(event) => {
                    setSelectedFile(event.target.files[0]);
                }} />
            </div>
            <div style={{ marginTop: '10px' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 5 }}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        contactNumber: ''

                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="FirstName"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your firstName!' },
                        {
                            validator(_, value) {
                                if (!onlyChar(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Please enter only character!');
                            },
                        }]}
                    >
                        <Input
                            type="firstName"
                            placeholder="firstName"
                            onBlur={() =>
                                setValidateFieldsName([...validateFieldsName, 'firstName'])
                            } />
                    </Form.Item>
                    <Form.Item
                        label="LastName"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your lastName!' },
                        {
                            validator(_, value) {
                                if (!onlyChar(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Please enter only character!');
                            },
                        }]}
                    >
                        <Input
                            type="lastName"
                            placeholder="lastName"
                            onBlur={() =>
                                setValidateFieldsName([...validateFieldsName, 'lastName'])
                            } />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' },
                        {
                            validator(_, value) {
                                if (emailValidator(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Please enter valid email!');
                            },
                        }]}
                    >
                        <Input
                            type="email"
                            placeholder="Email"
                            onBlur={() =>
                                setValidateFieldsName([...validateFieldsName, 'contactNumber'])
                            } />
                    </Form.Item>
                    <Form.Item
                        name="contactNumber"
                        label="Contact Number"
                        validateTrigger={handleValidateFieldNames('contactNumber')}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter contact number!',
                            },
                            {
                                validator(_, value) {
                                    if (!value || value.length === 10) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Please enter 10 digit Number!');
                                },
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            placeholder="Contact number"
                            onBlur={() =>
                                setValidateFieldsName([...validateFieldsName, 'contactNumber'])
                            }
                        />
                    </Form.Item>
                    <Form.Item name="dob" label="DatePicker"
                        rules={[{ required: true, message: 'Please input your BirthDate!' }]}>
                        <DatePicker />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10, span: 5 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default AddUser;