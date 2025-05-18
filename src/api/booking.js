import axios from 'axios';

const API_URL = 'http://localhost:8080/booking';

export const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(API_URL, bookingData);
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            'Failed to create booking';
        throw new Error(errorMessage);
    }
};

export const deleteBooking = async (bookingId) => {
    try {
        const response = await axios.delete(`${API_URL}/${bookingId}`);
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            error.message ||
            'Failed to delete booking';
        throw new Error(errorMessage);
    }
};

export const getUserBookings = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/by-user/${userId}`);
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            error.message ||
            'Failed to get user bookings';
        throw new Error(errorMessage);
    }
};

export const getWorkspaceBookings = async (workspaceId) => {
    try {
        const response = await axios.get(`${API_URL}/by-workspace/${workspaceId}`);
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            error.message ||
            'Failed to get workspace bookings';
        throw new Error(errorMessage);
    }
};

export const getAllBookings = async () => {
    try {
        const response = await axios.get(API_URL);
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            error.message ||
            'Failed to get all bookings';
        throw new Error(errorMessage);
    }
};