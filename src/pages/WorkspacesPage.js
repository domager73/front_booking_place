import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BookingForm from '../components/BookingForm';
import BookingTable from '../components/BookingTable';
import WorkspaceFilter from '../components/WorkspaceFilter';
import { getAllBookings, getWorkspaceBookings } from '../api/booking';
import { getAllWorkspaces } from '../api/workspace';

const { Title } = Typography;

const WorkspacesPage = ({ userId }) => {
    const [bookings, setBookings] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetchBookings();
        fetchWorkspaces();
    }, []);

    const fetchBookings = async (filters = {}) => {
        setLoading(true);
        try {
            let response;
            if (filters.workspaceId) {
                response = await getWorkspaceBookings(filters.workspaceId);
            } else {
                response = await getAllBookings();
            }

            let filteredData = response.data;
            if (filters.dates) {
                const [startDate, endDate] = filters.dates;
                filteredData = filteredData.filter(booking => {
                    const bookingStart = new Date(booking.startTime);
                    const bookingEnd = new Date(booking.endTime);
                    return bookingStart >= startDate && bookingEnd <= endDate;
                });
            }

            setBookings(filteredData);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWorkspaces = async () => {
        try {
            const response = await getAllWorkspaces();
            setWorkspaces(response.data);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };

    const handleFilter = (filters) => {
        fetchBookings(filters);
    };

    const handleBookingSuccess = () => {
        setVisible(false);
        fetchBookings();
    };

    const handleDeleteSuccess = () => {
        fetchBookings();
    };

    return (
        <div style={{ padding: 24 }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Title level={3}>Workspace Bookings</Title>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setVisible(true)}
                    >
                        New Booking
                    </Button>
                </Col>
            </Row>

            <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <WorkspaceFilter
                        onFilter={handleFilter}
                        workspaces={workspaces}
                    />
                    <BookingTable
                        bookings={bookings}
                        loading={loading}
                        onDeleteSuccess={handleDeleteSuccess}
                        isAction={false}
                    />
                </Space>
            </Card>

            <BookingForm
                visible={visible}
                onCancel={() => setVisible(false)}
                onSuccess={handleBookingSuccess}
                workspaces={workspaces}
                userId={userId}
            />
        </div>
    );
};

export default WorkspacesPage;