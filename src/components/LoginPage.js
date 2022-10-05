import { Button, Checkbox, Form, Input, Row } from 'antd';
import React from 'react';

class LoginPage extends React.Component {

    render() {
        const onLogin = (values) => {
            console.log('Success:', values);
        };

        const onLoginFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Row type="flex" justify="center" align="middle" style={{minHeight: '75vh'}}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 10,
                    }}
                    wrapperCol={{
                        span: 4,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        width: '100%',
                    }}
                    onFinish={onLogin}
                    onFinishFailed={onLoginFailed}
                    autoComplete="off"
                >
                    <Form.Item required={false}
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

                    <Form.Item required={false}
                               label="Password"
                               name="password"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input your password!',
                                   },
                               ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sign in
                        </Button> Or <a href="/signup">register now!</a>
                    </Form.Item>
                </Form>
            </Row>
        );
    }
};

export default LoginPage;