'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import type { QRCodeProps } from './types';
import { useQRCode, QRStatus } from '@/features/hooks';

const Container = styled(Box)(({ theme }) => ({
  textAlign: 'center',
}));

const Label = styled(Typography)(({ theme }) => ({
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

const StyledAlert = styled(
  Alert,
  { shouldForwardProp: (prop) => prop !== 'qrSize' }
)<{ qrSize: number }>(({ theme, qrSize }) => ({
  width: qrSize,
  height: qrSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  ...theme.typography.caption,
}));

const QRCodeComponent: React.FC<QRCodeProps> = ({
  url,
  size = 64,
  label,
}) => {
  const { dataUrl, status, errorMessage } = useQRCode(url, size);

  const contentByStatus: Record<QRStatus, React.ReactNode> = {
    [QRStatus.LOADING]: <Skeleton variant="rectangular" width={size} height={size} />,
    [QRStatus.ERROR]: (
      <StyledAlert severity="error" variant="outlined" qrSize={size}>
        {errorMessage}
      </StyledAlert>
    ),
    [QRStatus.SUCCESS]: <QRImage src={dataUrl} alt={`QR code for ${url}`} size={size} />,
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <QRWrapper>{contentByStatus[status]}</QRWrapper>
    </Container>
  );
};

export default QRCodeComponent;