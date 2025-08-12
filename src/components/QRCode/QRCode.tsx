'use client';

import { QRStatus, useQRCode } from '@/features/hooks';

import React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import type { IQRCodeProps } from './types';

const QRContainer = styled(Box)(() => ({
  textAlign: 'center',
}));

const QRLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.primary,
}));

const QRWrapper = styled(Box)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const QRImage = styled('img')<{ size: number }>(({ size }) => ({
  width: size,
  height: size,
  display: 'block',
}));

const StyledAlert = styled(Alert, { shouldForwardProp: prop => prop !== 'qrSize' })<{
  qrSize: number;
}>(({ theme, qrSize }) => ({
  width: qrSize,
  height: qrSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  ...theme.typography.caption,
}));

const qrContentByStatus = {
  [QRStatus.LOADING]: ({ size }: { size: number }) => (
    <Skeleton variant="rectangular" width={size} height={size} />
  ),
  [QRStatus.ERROR]: ({ size, errorMessage }: { size: number; errorMessage: string }) => (
    <StyledAlert severity="error" variant="outlined" qrSize={size}>
      {errorMessage}
    </StyledAlert>
  ),
  [QRStatus.SUCCESS]: ({ dataUrl, url, size }: { dataUrl: string; url: string; size: number }) => (
    <QRImage src={dataUrl} alt={`QR code for ${url}`} size={size} />
  ),
};

const QRCodeComponent: React.FC<IQRCodeProps> = ({ url, size = 64, label }) => {
  const { dataUrl, status, errorMessage } = useQRCode(url, size);

  return (
    <QRContainer>
      {label ? <QRLabel>{label}</QRLabel> : null}
      <QRWrapper>{qrContentByStatus[status]({ size, errorMessage, dataUrl, url })}</QRWrapper>
    </QRContainer>
  );
};

export default QRCodeComponent;
