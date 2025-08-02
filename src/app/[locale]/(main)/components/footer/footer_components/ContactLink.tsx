'use client';

import QRCodeComponent from '@/components/qr_code/qrcode';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import type { ContactLinkProps } from '../types';

// Styled Components using MUI theme
const ContactLinkContainer = styled(Box)(() => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ContactLinkText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  marginBottom: theme.spacing(1.5), // 12px
  color: 'white',
  textDecoration: 'none',
  display: 'block',
  textAlign: 'center',
}));

const QRContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

// Table-driven content mapping
const contactLinkContent = {
  text: ({ label, t }: { label: string; t: (key: string) => string }) => (
    <ContactLinkText>{t(label)}</ContactLinkText>
  ),
  qr: ({ href }: { href: string }) => (
    <QRContainer>
      <QRCodeComponent url={href} size={64} />
    </QRContainer>
  ),
};

export default function ContactLink({ href, label, t }: ContactLinkProps) {
  return (
    <ContactLinkContainer>
      {contactLinkContent.text({ label, t })}
      {contactLinkContent.qr({ href })}
    </ContactLinkContainer>
  );
}
