import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export enum QRStatus {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

export const useQRCode = (url: string, size: number) => {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [status, setStatus] = useState<QRStatus>(QRStatus.LOADING);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setStatus(QRStatus.LOADING);
        setErrorMessage('');
        
        const result = await QRCode.toDataURL(url, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
          },
        });
        
        setDataUrl(result);
        setStatus(QRStatus.SUCCESS);
      } catch {
        setErrorMessage('Failed to generate QR code');
        setStatus(QRStatus.ERROR);
      }
    };

    generateQRCode();
  }, [url, size]);

  return { dataUrl, status, errorMessage };
}; 