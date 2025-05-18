import React from 'react';
import {Button, DatePicker, Form, message, Modal, Select} from 'antd';
import { createBooking } from '../api/booking';

const { Option } = Select;
const { RangePicker } = DatePicker;

const BookingForm = ({ visible, onCancel, onSuccess, workspaces, userId }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const [startDate, endDate] = values.dates;
            console.log(startDate);
            console.log(endDate);
            const bookingData = {
                userId,
                workspaceId: values.workspaceId,
                startTime: startDate.toISOString().slice(0, -5),
                endTime: endDate.toISOString().slice(0, -5),
            };

            await createBooking(bookingData);
            message.success('Booking created successfully!');
            onSuccess();
            form.resetFields();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Modal
            title="New Booking"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="workspaceId"
                    label="Workspace"
                    rules={[{ required: true, message: 'Please select a workspace!' }]}
                >
                    <Select placeholder="Select a workspace">
                        {workspaces.map(ws => (
                            <Option key={ws.id} value={ws.id}>{ws.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="dates"
                    label="Booking Period in UTC"
                    rules={[{ required: true, message: 'Please select booking dates!' }]}
                >
                    <RangePicker showTime format="YYYY-MM-DD HH:mm" />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BookingForm;