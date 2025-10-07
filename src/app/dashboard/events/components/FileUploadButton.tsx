'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

import { CTAButton } from '../../../../components/Button/CTAButton';

const StyledUploadButton = styled(CTAButton)({
  width: '100%',
  maxWidth: '540px',
});

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
    <StyledUploadButton variant="contained" component="label" fullWidth={fullWidth}>
      Upload Image
      <input type="file" name={name} onChange={handleChange} accept={accept} hidden />
    </StyledUploadButton>
  );
};

export default FileUploadButton;
