// Types for the signup request and response
export interface SignupRequest {
  userName: string;
  email: string;
  password: string;
  organizationName: string;
  phoneNumber: string;
}

export interface SignupResponse {
  success: true;
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
