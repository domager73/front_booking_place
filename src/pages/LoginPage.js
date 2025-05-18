import React from 'react';
import { Card, Typography } from 'antd';
import AuthForm from '../components/AuthForm';

const { Title } = Typography;

const LoginPage = ({ onLoginSuccess }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 500 }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                    Booking System Login
                </Title>
                <AuthForm onLoginSuccess={onLoginSuccess} />
            </Card>
        </div>
    );
};

export default LoginPage;