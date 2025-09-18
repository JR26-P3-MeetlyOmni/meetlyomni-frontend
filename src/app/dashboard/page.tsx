'use client';

import { selectError, selectIsAuthenticated, selectUser } from '@/features/auth/selectors';
import CreateEventModal from '@/features/events/components/CreateEventModal';
import { useAppSelector } from '@/store/hooks';

import { useCallback, useState } from 'react';

export default function DashboardPage() {
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [creatEventModalOpen, setCreatEventModalOpen] = useState(true);
  const handleOnClose = useCallback(() => {
    setCreatEventModalOpen(false);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {error ? <div style={{ color: 'red' }}>Error: {error}</div> : null}

      {isAuthenticated && user ? (
        <div>
          <p>Welcome to meetlyomni!</p>

          <CreateEventModal open={creatEventModalOpen} onClose={handleOnClose} />

          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
        </div>
      ) : (
        <p>Please log in to access your dashboard.</p>
      )}
    </div>
  );
}
