'use client';

import React from 'react';

import { CTAButton } from '../../../../../components/Button/CTAButton';

interface FileReUploadButtonProps {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  fullWidth?: boolean;
}

const FileReUploadButton: React.FC<FileReUploadButtonProps> = ({
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
      Reupload Image
      <input type="file" name={name} onChange={handleChange} accept={accept} hidden />
    </CTAButton>
  );
};

export default FileReUploadButton;
