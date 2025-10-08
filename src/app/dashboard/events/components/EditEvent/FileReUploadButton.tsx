'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

import { CTAButton } from '../../../../../components/Button/CTAButton';

const StyledReUploadButton = styled(CTAButton)({
  width: '100%',
  maxWidth: '540px',
});

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
    <StyledReUploadButton variant="contained" component="label" fullWidth={fullWidth}>
      Reupload Image
      <input type="file" name={name} onChange={handleChange} accept={accept} hidden />
    </StyledReUploadButton>
  );
};

export default FileReUploadButton;
