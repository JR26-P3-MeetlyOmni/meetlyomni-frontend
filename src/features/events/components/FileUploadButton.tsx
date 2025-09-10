'use client';

import React from 'react';

import { CTAButton } from '../../../components/Button/ActionButtons';

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
    <CTAButton variant="contained" width={500} component="label" fullWidth={fullWidth}>
      Upload File
      <input type="file" name={name} onChange={handleChange} accept={accept} hidden />
    </CTAButton>
  );
};

export default FileUploadButton;
