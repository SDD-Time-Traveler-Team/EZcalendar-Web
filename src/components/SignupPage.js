import {
    Button,
    Form,
    Input,
    Modal,
    Row,
} from 'antd';
import React, { useState } from "react";
import Authentication from "../api/Authentication";
import { useNavigate } from "react-router-dom";

const {TextArea} = Input;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 4,
        },
        sm: {
            span: 10,
        },
    },
    wrapperCol: {
        xs: {
            span: 4,
        },
        sm: {
            span: 4,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 4,
            offset: 0,
        },
        sm: {
            span: 10,
            offset: 10,
        },
    },
};

const SignupPage = () => {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [auth, setAuth] = useState(new Authentication());
    const [code, setCode] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    const onSignUp = (values) => {
        console.log('Received values of form: ', values.email);
        auth.signUp(values.email, values.password).then(() => {
            setUserEmail(values.email);
            setConfirmModalOpen(true);
        });
    };

    const onConfirmSignUp = () => {
        auth.confirmSignUp(userEmail, code).then(() => {
            console.log("signup confirmed");
            navigate("/login");
        });
    };

    return (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '75vh'}}>
            <Modal title={"Confirm SignUp"} open={confirmModalOpen} onOk={onConfirmSignUp}>
                <TextArea onChange={(e) => setCode(e.target.value)}/>
            </Modal>

            <Form
                {...formItemLayout}
                name="register"
                onFinish={onSignUp}
                scrollToFirstError
                style={{
                    width: '100%',
                }}
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button> Or <a href="/login">Go sign in.</a>
                </Form.Item>
            </Form>
        </Row>
    );
};

export default SignupPage;