import { Resource, CalculationRequest, CalculationResponse } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new ApiError(response.status, error || 'An error occurred');
  }
  return response.json();
}

export const api = {
  async getCatalog(): Promise<Resource[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/catalog`);
      return handleResponse<Resource[]>(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new Error('Failed to connect to the server. Please ensure the backend is running.');
    }
  },

  async calculateCost(data: CalculationRequest): Promise<CalculationResponse> {
    try {
      const queryParams = new URLSearchParams({
        resourceName: data.resourceName,
        quantity: data.quantity.toString(),
        reservation_term: data.reservation_term,
        user_tier: data.user_tier,
      });

      const response = await fetch(`${API_BASE_URL}/calculate?${queryParams}`, {
        method: 'POST',
      });

      return handleResponse<CalculationResponse>(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new Error('Failed to connect to the server. Please ensure the backend is running.');
    }
  },
};