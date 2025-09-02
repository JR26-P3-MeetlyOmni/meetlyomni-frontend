'use client';

import { selectError, selectIsAuthenticated, selectUser } from '@/features/auth';
import { useAppSelector } from '@/store/hooks';

export default function DashboardPage() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 80px)', // Account for header height
        backgroundColor: 'var(--mui-palette-background-default)',
        padding: '20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Empty dashboard content */}
    </div>
  );
}
