'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import QRCodeComponent from '@/components/qr_code/qrcode';
import type { ContactLinkProps } from '../types';

export default function ContactLink({ href, label, t }: ContactLinkProps) {
  return (
    <Box className="contact-link-container">
      <Typography className="contact-link-text">{t(label)}</Typography>
      <Box className="qr-container">
        <QRCodeComponent url={href} size={64} />
      </Box>
    </Box>
  );
}
