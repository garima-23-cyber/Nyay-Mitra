import axios from 'axios';

const API_URL = "http://localhost:8000/api/v1/documents";

// 1. Existing Document Processing
export const processDocument = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/process`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// 2. NEW: Search Laws (IPC/BNS Knowledge Base)
export const searchLaws = async (query) => {
    try {
        // We pass the search string as a URL parameter
        const response = await axios.get(`${API_URL}/search-laws`, {
            params: { query: query }
        });
        return response.data; // This will be the list of RightCards
    } catch (error) {
        console.error("Error fetching legal knowledge:", error);
        throw error;
    }
};