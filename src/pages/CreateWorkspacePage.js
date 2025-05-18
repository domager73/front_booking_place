import React, { useState } from 'react';
import { Button, Card, Form, Input, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createWorkspace } from '../api/workspace';

const { Title } = Typography;

const CreateWorkspacePage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await createWorkspace(values);
            message.success('Workspace created successfully!');
            form.resetFields();
            navigate('/');
        } catch (error) {
            message.error(error.message || 'Failed to create workspace');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <Card>
                <Title level={3}>Create New Workspace</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="name"
                        label="Workspace Name"
                        rules={[{ required: true, message: 'Please input workspace name!' }]}
                    >
                        <Input placeholder="e.g., Conference Room A" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Create Workspace
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreateWorkspacePage;