'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 邮箱格式验证
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // 处理邮箱输入变化
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // 清除之前的错误
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 清除之前的错误
    setErrors([]);

    // 验证邮箱是否为空
    if (!email.trim()) {
      setErrors(['Email address is required.']);
      return;
    }

    // 验证邮箱格式
    if (!validateEmail(email)) {
      setErrors(['Please enter a valid email address.']);
      return;
    }

    // 验证邮箱中是否包含空格
    if (email.includes(' ')) {
      setErrors(['Email address cannot contain spaces.']);
      return;
    }

    setIsSubmitting(true);

    try {
      // 这里应该调用API检查邮箱是否已存在
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟检查邮箱是否已存在（这里应该调用真实的API）
      const isEmailExists = false; // 这里应该是API调用的结果

      if (isEmailExists) {
        setErrors(['This email address is already in use. Please use a different one or log in.']);
        return;
      }

      // 邮箱验证通过，继续下一步
      console.log('Email validated:', email.toLowerCase());
      // 这里可以跳转到下一步或发送验证邮件
    } catch {
      setErrors(['An error occurred. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理返回按钮
  const handleBack = () => {
    // 这里可以导航到登录页面
    console.log('Navigate to login page');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        display: 'flex',
      }}
    >
      {/* 左侧主要内容区域 */}
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
        {/* 头部 */}
        <div
          style={{
            width: '100%',
            maxWidth: '448px',
          }}
        >
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

            {/* 登录按钮 */}
            <button
              onClick={handleBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#4b5563',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '14px',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#2563eb')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4b5563')}
              aria-label="Sign in"
            >
              <span style={{ marginRight: '4px' }}>←</span>
              Sign in
            </button>
          </div>

          {/* 主要内容 */}
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

          {/* 邮箱输入表单 */}
          <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
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
                onChange={handleEmailChange}
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
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#2563eb';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = errors.length > 0 ? '#ef4444' : '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                aria-describedby={errors.length > 0 ? 'email-errors' : undefined}
                aria-required="true"
                disabled={isSubmitting}
                autoComplete="email"
                autoFocus
              />

              {/* 错误信息显示 */}
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

            {/* 按钮组 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <button
                type="button"
                onClick={handleBack}
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
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#9ca3af')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#d1d5db')}
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
                onMouseEnter={e => {
                  if (!isSubmitting && email.trim()) {
                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSubmitting && email.trim()) {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }
                }}
                aria-label="Continue to next step"
              >
                {isSubmitting ? 'Processing...' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 右侧信息面板 */}
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
          {/* 表情符号 */}
          <div
            style={{
              fontSize: '64px',
              marginBottom: '16px',
            }}
          >
            😊
          </div>

          {/* 标题 */}
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

          {/* 占位内容 */}
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

          {/* 状态指示器 */}
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

      {/* 底部进度指示器 */}
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
    </div>
  );
}
