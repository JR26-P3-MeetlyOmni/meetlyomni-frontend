'use client';

import React from 'react';

import { CTAButton } from '../../../components/Button/CTAButton';

interface FileUploadButtonProps {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  fullWidth?: boolean;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  name,
  handleChange,
  accept = 'image/*',
  fullWidth = true,
}) => {
  return (
    <CTAButton
      variant="contained"
      component="label"
      fullWidth={fullWidth}
      sx={{ width: '100%', maxWidth: '540px' }}
    >
      Upload File
      <input type="file" name={name} onChange={handleChange} accept={accept} hidden />
    </CTAButton>
  );
};

export default FileUploadButton;
