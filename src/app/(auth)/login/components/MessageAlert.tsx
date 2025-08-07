import React from 'react';

import Alert from '@mui/material/Alert';

import type { MessageAlertProps } from '../types';
import { MessageContainer } from './LoginFormStyles';

export const MessageAlert: React.FC<MessageAlertProps> = ({ loginState }) => (
  <>
    {/* Error Message */}
    {loginState.error ? (
      <MessageContainer>
        <Alert severity="error" aria-label="error">
          {loginState.error}
        </Alert>
      </MessageContainer>
    ) : null}

    {/* Success Message */}
    {loginState.status === 'success' ? (
      <MessageContainer>
        <Alert severity="success" aria-label="success">
          登录成功！正在跳转...
        </Alert>
      </MessageContainer>
    ) : null}
  </>
);
