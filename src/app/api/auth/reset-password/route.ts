import { NextRequest, NextResponse } from 'next/server';
import { mockUsers, resetTokens } from '../shared-data';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    console.log('=== RESET PASSWORD DEBUG ===');
    console.log('Received token:', token);
    console.log('Available tokens:', Array.from(resetTokens.keys()));
    console.log('Token count:', resetTokens.size);

    // Validate input
    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: `Password requirements not met: ${passwordValidation.errors.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if token exists and is valid
    const tokenData = resetTokens.get(token);
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Check if token is expired (15 minutes)
    const FIFTEEN_MINUTES = 15 * 60 * 1000;
    if (Date.now() - tokenData.createdAt > FIFTEEN_MINUTES) {
      resetTokens.delete(token);
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      );
    }

    // Find user
    const user = mockUsers.find(u => u.email.toLowerCase() === tokenData.email.toLowerCase());
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Simulate password update
    console.log(`\n=== PASSWORD UPDATED ===`);
    console.log(`User: ${user.email}`);
    console.log(`New password: ${newPassword}`);
    console.log(`========================\n`);

    // Remove the used token
    resetTokens.delete(token);

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 12) {
    errors.push('at least 12 characters');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('at least 1 uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('at least 1 lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('at least 1 number');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('at least 1 special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}