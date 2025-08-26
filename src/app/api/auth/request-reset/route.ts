import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { mockUsers, resetTokens } from '../shared-data';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate reset token
    const token = uuidv4();
    resetTokens.set(token, {
      email: user.email,
      createdAt: Date.now()
    });

    // Generate reset URL
    const resetUrl = `http://localhost:3000/forgetpassword/resetpw?token=${token}`;
    
    // Simulate sending email by logging to console
    console.log('\n=== PASSWORD RESET EMAIL ===');
    console.log(`To: ${user.email}`);
    console.log(`Subject: Reset your password`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log('==============================\n');

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Request reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}