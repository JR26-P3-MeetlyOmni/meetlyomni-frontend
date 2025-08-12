'use client';

import { resetEmailState, setEmail, validateEmailAsync } from '@/store/features/emailSlice';
import { AppDispatch, RootState } from '@/store/store';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Email input component
function EmailInput({
  email,
  errors,
  isSubmitting,
  onEmailChange,
  onFocus,
  onBlur,
}: {
  email: string;
  errors: string[];
  isSubmitting: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label
        htmlFor="email"
        style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '8px',
        }}
      >
        Email:
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Enter your email address"
        style={{
          width: '100%',
          padding: '12px 16px',
          border: errors.length > 0 ? '1px solid #ef4444' : '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '16px',
          outline: 'none',
          transition: 'all 0.2s',
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-describedby={errors.length > 0 ? 'email-errors' : undefined}
        aria-required="true"
        disabled={isSubmitting}
        autoComplete="email"
        autoFocus
      />

      {/* Error message display */}
      {errors.length > 0 && (
        <div
          id="email-errors"
          style={{
            marginTop: '8px',
            fontSize: '14px',
            color: '#dc2626',
          }}
          role="alert"
          aria-live="polite"
        >
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// Button group component
function ButtonGroup({
  isSubmitting,
  email,
  onSubmit,
  onBack,
}: {
  isSubmitting: boolean;
  email: string;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  const handleBackClick = useCallback(() => {
    onBack();
  }, [onBack]);

  const handleSubmitClick = useCallback(
    (e: React.FormEvent) => {
      onSubmit(e);
    },
    [onSubmit],
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <button
        type="button"
        onClick={handleBackClick}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '2px solid #d1d5db',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
        aria-label="Go back"
      >
        <span style={{ color: '#4b5563', fontSize: '18px' }}>←</span>
      </button>

      <button
        type="submit"
        disabled={isSubmitting || !email.trim()}
        style={{
          flex: 1,
          backgroundColor: isSubmitting || !email.trim() ? '#9ca3af' : '#2563eb',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: '500',
          border: 'none',
          cursor: isSubmitting || !email.trim() ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
        onClick={handleSubmitClick}
        aria-label="Continue to next step"
      >
        {isSubmitting ? 'Processing...' : 'Next'}
      </button>
    </div>
  );
}

// Placeholder content component
function PlaceholderContent() {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          height: '12px',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          width: '75%',
          marginBottom: '12px',
        }}
      ></div>
      <div
        style={{
          height: '12px',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          width: '50%',
          marginBottom: '12px',
        }}
      ></div>
      <div
        style={{
          height: '12px',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          width: '83%',
        }}
      ></div>
    </div>
  );
}

// Right panel component
function RightPanel() {
  return (
    <div
      className="signup-right-panel"
      style={{
        display: 'none',
        width: '384px',
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          maxWidth: '320px',
        }}
      >
        {/* Emoji */}
        <div
          style={{
            fontSize: '64px',
            marginBottom: '16px',
          }}
        >
          😊
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '4px',
          }}
        >
          Omni
        </h3>
        <p
          style={{
            color: '#4b5563',
            marginBottom: '24px',
          }}
        >
          Omni@gmail.com
        </p>

        <PlaceholderContent />

        {/* Status indicator */}
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#2563eb',
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Progress indicator component
function ProgressIndicator() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
          }}
        ></div>
        <div
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#d1d5db',
            borderRadius: '50%',
          }}
        ></div>
        <div
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#d1d5db',
            borderRadius: '50%',
          }}
        ></div>
      </div>
    </div>
  );
}

// Header component
function Header({ onBack }: { onBack: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '8px',
          }}
        >
          <span
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            O
          </span>
        </div>
        <span
          style={{
            color: '#2563eb',
            fontWeight: 'bold',
            fontSize: '20px',
          }}
        >
          Omni
        </span>
      </div>

      {/* Sign in button */}
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          color: '#4b5563',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          fontSize: '14px',
        }}
        aria-label="Sign in"
      >
        <span style={{ marginRight: '4px' }}>←</span>
        Sign in
      </button>
    </div>
  );
}

// Main content component
function MainContent({
  email,
  errors,
  isSubmitting,
  onEmailChange,
  onFocus,
  onBlur,
  onSubmit,
  onBack,
}: {
  email: string;
  errors: string[];
  isSubmitting: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px 32px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '448px',
        }}
      >
        <Header onBack={onBack} />

        {/* Main content */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          <h1
            style={{
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '8px',
            }}
          >
            Please Enter Your Email Address
          </h1>
          <p
            style={{
              color: '#4b5563',
            }}
          >
            This email address will be used as your primary account
          </p>
        </div>

        {/* Email input form */}
        <form onSubmit={onSubmit} style={{ marginBottom: '24px' }}>
          <EmailInput
            email={email}
            errors={errors}
            isSubmitting={isSubmitting}
            onEmailChange={onEmailChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <ButtonGroup
            isSubmitting={isSubmitting}
            email={email}
            onSubmit={onSubmit}
            onBack={onBack}
          />
        </form>
      </div>
    </div>
  );
}

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { email, errors, isSubmitting } = useSelector((state: RootState) => state.email);

  // Email format validation
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }, []);

  // Handle email input change
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      dispatch(setEmail(value));
    },
    [dispatch],
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate email is not empty
      if (!email.trim()) {
        dispatch(setEmail(''));
        return;
      }

      // Validate email format
      if (!validateEmail(email)) {
        dispatch(setEmail(email));
        return;
      }

      // Validate email doesn't contain spaces
      if (email.includes(' ')) {
        dispatch(setEmail(email));
        return;
      }

      // 使用Redux异步action验证邮箱
      dispatch(validateEmailAsync(email));
    },
    [email, validateEmail, dispatch],
  );

  // Handle back button
  const handleBack = useCallback(() => {
    // 重置邮箱状态
    dispatch(resetEmailState());
  }, [dispatch]);

  // Handle input focus
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#2563eb';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
  }, []);

  // Handle input blur
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = errors.length > 0 ? '#ef4444' : '#d1d5db';
      e.currentTarget.style.boxShadow = 'none';
    },
    [errors.length],
  );

  // 组件卸载时清理状态
  useEffect(() => {
    return () => {
      dispatch(resetEmailState());
    };
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        display: 'flex',
      }}
    >
      <MainContent
        email={email}
        errors={errors}
        isSubmitting={isSubmitting}
        onEmailChange={handleEmailChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
      <RightPanel />
      <ProgressIndicator />
    </div>
  );
}
