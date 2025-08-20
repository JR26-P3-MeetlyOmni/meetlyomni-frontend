'use client';

import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/features/auth/selectors';

export default function DashboardPage() {
  const user = useAppSelector(selectUser);

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email ?? 'Guest'}</p>
    </div>
  );
}