import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.typography.subtitle1.fontSize,
  fontWeight: theme.typography.fontWeightBold,
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ImageLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const CoverImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '300px',
  height: 'auto',
  borderRadius: theme.spacing(1),
  border: '1px solid',
  borderColor: theme.palette.grey[300],
  display: 'block',
}));
