// This is Mock API, will be disposed after ticket: #31 complete.
import { NextRequest, NextResponse } from 'next/server';

import { AUTH_COOKIE_CONFIG, AUTH_ERRORS, MOCK_CREDENTIALS, MOCK_USER } from './constants';
import type { ApiError } from './types';

function createErrorResponse(code: string, message: string, status: number): NextResponse {
  const errorResponse: ApiError = {
    error: message,
    code,
    message,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(errorResponse, { status });
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return createErrorResponse(
        AUTH_ERRORS.MISSING_CREDENTIALS.code,
        AUTH_ERRORS.MISSING_CREDENTIALS.message,
        AUTH_ERRORS.MISSING_CREDENTIALS.status,
      );
    }

    // Valid credentials
    if (email === MOCK_CREDENTIALS.VALID_EMAIL && password === MOCK_CREDENTIALS.VALID_PASSWORD) {
      const response = NextResponse.json({
        user: MOCK_USER,
      });

      // Set HTTP-only cookie
      response.cookies.set(
        AUTH_COOKIE_CONFIG.name,
        AUTH_COOKIE_CONFIG.value,
        AUTH_COOKIE_CONFIG.options,
      );

      return response;
    } else {
      // Invalid credentials
      return createErrorResponse(
        AUTH_ERRORS.INVALID_CREDENTIALS.code,
        AUTH_ERRORS.INVALID_CREDENTIALS.message,
        AUTH_ERRORS.INVALID_CREDENTIALS.status,
      );
    }
  } catch {
    return createErrorResponse(
      AUTH_ERRORS.INTERNAL_ERROR.code,
      AUTH_ERRORS.INTERNAL_ERROR.message,
      AUTH_ERRORS.INTERNAL_ERROR.status,
    );
  }
}
