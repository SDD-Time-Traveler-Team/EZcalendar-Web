import {
    Button,
    Checkbox,
    Form,
    Input,
    Row,
} from 'antd';
import React from "react";

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

    const onSignup = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '75vh'}}>
            <Form
                {...formItemLayout}
                name="register"
                onFinish={onSignup}
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

                <Form.Item
                    name="username"
                    label="Username"
                    tooltip="What do you want others to call you?"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
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