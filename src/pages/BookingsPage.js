import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import BookingTable from '../components/BookingTable';
import { getUserBookings } from '../api/booking';

const { Title } = Typography;

const BookingsPage = ({ userId }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, [userId]);

    const fetchBookings = async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const response = await getUserBookings(userId);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching user bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSuccess = () => {
        fetchBookings();
    };

    return (
        <div style={{ padding: 24 }}>
            <Card>
                <Title level={3}>My Bookings</Title>
                <BookingTable
                    bookings={bookings}
                    loading={loading}
                    onDeleteSuccess={handleDeleteSuccess}
                />
            </Card>
        </div>
    );
};

export default BookingsPage;