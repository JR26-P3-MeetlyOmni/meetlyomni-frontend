'use client';

import { selectError, selectIsAuthenticated, selectUser } from '@/features/auth/selectors';
import { logout } from '@/features/auth/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const ClientDashboardContent = () => {
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.push('/');
  }, [dispatch, router]);

  return (
    <div>
      <h1>Dashboard</h1>

      {error ? <div style={{ color: 'red' }}>Error: {error}</div> : null}

      {isAuthenticated && user ? (
        <div>
          <p>Welcome to meetlyomni!</p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <button
            onClick={handleLogout}
            style={{ marginTop: '20px', padding: '10px 20px' }}
            type="button"
          >
            Logout & back to home
          </button>
        </div>
      ) : (
        <p>Please log in to access your dashboard.</p>
      )}
    </div>
  );
};
