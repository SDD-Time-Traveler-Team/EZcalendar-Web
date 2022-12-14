import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, Modal, Row, Alert} from 'antd';
import Authentication from "../utils/Authentication";

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
    const [auth] = useState(new Authentication());
    const [code, setCode] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();
    //handle hiding confirmation code modal
    const hideModal = () => {
        setConfirmModalOpen(false);
    };

    //send request to server when signing up
    const onSignUp = (values) => {
        console.log('Received values of form: ', values.email);
        auth.signUp(values.email, values.password).then((user) => {
            setUserEmail(values.email);
            setConfirmModalOpen(true);
        }).catch((err) => {
            console.log(`signup fail ${err}`);
        });
    };

    //send request to server to confirm sign up
    const onConfirmSignUp = () => {
        auth.confirmSignUp(userEmail, code).then(() => {
            console.log("confirmation succeed");
            navigate("/login");
        }).catch((err) => {
            console.log(`confirmation fail ${err}`);
            setAlertOpen(true);
        });
    };

    const onClose = (e) => {
        console.log(e, 'I was closed.');
        setAlertOpen(false);
    };

    return (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '75vh'}}>
            <Modal
                title={"Email Confirmation Code"}
                open={confirmModalOpen}
                onOk={onConfirmSignUp}
                onCancel={hideModal}
                okText="Confirm"
                cancelText="Cancel">
                <Alert
                    message="Please check your email for confirmation code!"
                    type="success"
                    closable
                    onClose={onClose}
                />
                <Input align='middle' type='number' onChange={(e) => setCode(e.target.value)} size='large'
                       max={6} min={1}/>
                {alertOpen ?
                    (<Alert
                        message="Error"
                        description="Incorrect Email Confirmation Code!"
                        type="error"
                        closable
                        onClose={onClose}
                    />)
                    :
                    <></>
                }
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
                        {
                            min: 8,
                            message: 'Please input your password with minimum length of 8!',
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