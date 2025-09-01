import React from 'react';

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
      <div
        style={{
          fontSize: '40px',
          color: '#666',
          fontStyle: 'italic',
          marginBottom: '20px',
        }}
      >
        This page is still under development ...
      </div>
      {/* Empty dashboard content */}
    </div>
  );
}
