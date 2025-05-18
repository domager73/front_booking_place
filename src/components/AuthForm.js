import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { logIn, signIn } from '../api/user';

const AuthForm = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const requestData = isLogin
                ? { email: values.email, password: values.password }
                : {
                    email: values.email,
                    password: values.password,
                    fullName: values.fullName,
                    role: 'user'
                };

            const response = isLogin
                ? await logIn(requestData)
                : await signIn(requestData);

            const userData = response.data || response;

            message.success(isLogin ? 'Login successful!' : 'Registration successful!');
            onLoginSuccess(userData);
        } catch (error) {
            message.error(error.response?.data?.message || error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="auth"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            style={{ maxWidth: 400, margin: '0 auto' }}
        >
            {!isLogin && (
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{
                        required: true,
                        message: 'Please input your full name!'
                    }]}
                >
                    <Input placeholder="Enter your full name" />
                </Form.Item>
            )}

            <Form.Item
                label="Email"
                name="email"
                rules={[{
                    required: true,
                    message: 'Please input your email!',
                    type: 'email'
                }]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{
                    required: true,
                    message: 'Please input your password!',
                    min: 6,
                }]}
            >
                <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </Form.Item>

            <Button type="link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need to register?' : 'Already have an account?'}
            </Button>
        </Form>
    );
};

export default AuthForm;