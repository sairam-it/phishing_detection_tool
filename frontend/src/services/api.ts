import axios from 'axios';
import { ScanResponse, APIError } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const scanURL = async (url: string): Promise<ScanResponse> => {
  try {
    const response = await api.post('/scan/url', { url });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        throw new Error('Backend server is not running. Please start the FastAPI server on port 8000.');
      }
      if (error.response) {
        throw new Error(error.response.data?.detail || 'Server error occurred');
      }
      if (error.request) {
        throw new Error('No response from server. Please check your connection.');
      }
    }
    throw new Error('An unexpected error occurred');
  }
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};