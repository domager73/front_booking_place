import React from 'react';
import { Table, Button, Popconfirm, Tag, Space } from 'antd';
import { deleteBooking } from '../api/booking';
import moment from 'moment';

const BookingTable = ({ bookings, loading, onDeleteSuccess, isAction = true }) => {
    const columns = [
        {
            title: 'Workspace Name',
            key: 'workspaceName',
            render: (_, record) => record.workspace.name,
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Tag color={moment(record.endTime).isAfter() ? 'green' : 'red'}>
                    {moment(record.endTime).isAfter() ? 'Active' : 'Expired'}
                </Tag>
            ),
        },
    ];

    if(isAction) {
        columns.push(
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <Space size="middle">
                        <Popconfirm
                            title="Are you sure to delete this booking?"
                            onConfirm={async () => {
                                await deleteBooking(record.id);
                                onDeleteSuccess();
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                ),
            }
        )
    }

    return (
        <Table
            columns={columns}
            dataSource={bookings}
            rowKey="id"
            loading={loading}
        />
    );
};

export default BookingTable;