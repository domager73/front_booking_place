import axios from 'axios';

const API_URL = 'http://localhost:8080/workspace';

export const createWorkspace = async (workspaceData) => {
    return await axios.post(API_URL, workspaceData);
};

export const deleteWorkspace = async (workspaceId) => {
    return await axios.delete(`${API_URL}/${workspaceId}`);
};

export const updateWorkspace = async (workspaceData) => {
    return await axios.put(API_URL, workspaceData);
};

export const getAllWorkspaces = async (workspaceData) => {
    return await axios.get(API_URL, workspaceData);
};