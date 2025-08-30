import type { URLInput, ScanResult, APIError } from '../types/api';

const API_BASE_URL = 'http://localhost:8000';

export async function scanURL(url: string): Promise<ScanResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/scan/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url } as URLInput),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result as ScanResult;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the server. Please ensure the backend is running on http://localhost:8000');
    }
    throw error;
  }
}