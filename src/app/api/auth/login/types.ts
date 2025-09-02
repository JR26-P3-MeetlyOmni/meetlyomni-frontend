// API Error Response Types
export interface ApiError {
  error: string;
  code: string;
  message: string;
  timestamp: string;
}

// User Response Types
export interface UserResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Login Request Types
export interface LoginRequest {
  email: string;
  password: string;
}
