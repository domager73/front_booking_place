import React from 'react';
import { Button, DatePicker, Form, Select, Space } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const WorkspaceFilter = ({ onFilter, workspaces }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onFilter(values);
    };

    const onReset = () => {
        form.resetFields();
        onFilter({});
    };

    return (
        <Form form={form} layout="inline" onFinish={onFinish}>
            <Form.Item name="workspaceId" label="Workspace">
                <Select style={{ width: 180 }} placeholder="Select workspace">
                    {workspaces.map(ws => (
                        <Option key={ws.id} value={ws.id}>{ws.name}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="dates" label="Booking Date">
                <RangePicker />
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Filter
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default WorkspaceFilter;