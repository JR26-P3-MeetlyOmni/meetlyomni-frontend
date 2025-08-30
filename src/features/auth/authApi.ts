// API base URL - update this with your actual API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7011';

// Types for the signup request and response
export interface SignupRequest {
  userName: string;
  email: string;
  password: string;
  organizationName: string;
  phoneNumber: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    companyId: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

/**
 * Signup API function
 * @param signupData - The signup form data
 * @returns Promise with signup response or error
 */
export async function signup(signupData: SignupRequest): Promise<SignupResponse | ApiError> {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Signup failed',
        error: data.error,
      };
    }

    return {
      success: true,
      message: data.message || 'Signup successful',
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
