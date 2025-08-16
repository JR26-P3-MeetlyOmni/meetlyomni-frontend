import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface SignInFormProps {
  formData: { email: string; password: string };
  errors: { email: string; password: string };
  showPassword: boolean;
  isSubmitting: boolean;
  isFormValid: boolean;
  handleInputChange: (field: string, value: string) => void;
  handleInputBlur: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  errors,
  showPassword,
  isSubmitting,
  isFormValid,
  handleInputChange,
  handleInputBlur,
  handleSubmit,
  setShowPassword,
}) => {
  const theme = useTheme();
  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        maxWidth: 412,
        mx: 'auto',
      }}
    >
      {/* Email Label */}
      <Typography
        variant="body2"
        sx={{
          ...theme.typography.body2,
          color: theme.palette.text.primary, // 黑色
          mb: theme.spacing(0.75),
          textAlign: 'left',
        }}
      >
        Email
      </Typography>
      <TextField
        required
        fullWidth
        id="email"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        onBlur={(e) => handleInputBlur('email', e.target.value)}
        error={!!errors.email}
        placeholder="Email Address"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            '& fieldset': { borderColor: errors.email ? theme.palette.error.main : theme.palette.grey[300] },
            '&:hover fieldset': { borderColor: errors.email ? theme.palette.error.main : theme.palette.primary.main },
            '&.Mui-focused fieldset': { borderColor: errors.email ? theme.palette.error.main : theme.palette.primary.main },
          },
          '& .MuiInputLabel-root': { display: 'none' },
          '& .MuiInputBase-input': { ...theme.typography.body2 },
          mb: theme.spacing(1),
        }}
      />
      {errors.email && (
        <Typography
          variant="caption"
          sx={{
            ...theme.typography.caption,
            color: theme.palette.error.main,
            mt: theme.spacing(0.5),
            mb: theme.spacing(1),
            textAlign: 'left',
          }}
        >
          {errors.email}
        </Typography>
      )}
      {/* Password Label */}
      <Typography
        variant="body2"
        sx={{
          ...theme.typography.body2,
          color: theme.palette.text.primary,
          mb: theme.spacing(0.75),
          textAlign: 'left',
        }}
      >
        Password
      </Typography>
      <TextField
        required
        fullWidth
        name="password"
        type="text"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        onBlur={(e) => handleInputBlur('password', e.target.value)}
        error={!!errors.password}
        placeholder="Password"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            '& fieldset': { borderColor: errors.password ? theme.palette.error.main : theme.palette.grey[300] },
            '&:hover fieldset': { borderColor: errors.password ? theme.palette.error.main : theme.palette.primary.main },
            '&.Mui-focused fieldset': { borderColor: errors.password ? theme.palette.error.main : theme.palette.primary.main },
          },
          '& .MuiInputLabel-root': { display: 'none' },
          '& .MuiInputBase-input': { ...theme.typography.body2 },
          mb: theme.spacing(1),
        }}
      />
      {errors.password && (
        <Typography
          variant="caption"
          sx={{
            ...theme.typography.caption,
            color: theme.palette.error.main,
            mt: theme.spacing(0.5),
            mb: theme.spacing(1),
            textAlign: 'left',
          }}
        >
          {errors.password}
        </Typography>
      )}
      <Box sx={{ textAlign: 'left', mb: theme.spacing(2) }}>
        <Link
          href="/forgot-password"
          variant="body2"
          sx={{
            ...theme.typography.body2,
            color: theme.palette.primary.light || theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Forgot Password?
        </Link>
      </Box>
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{
          width: '100%',
          height: 38,
          my: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1],
          backgroundColor: theme.palette.grey[900],
          textTransform: 'none', // ensure the text is not capitalized
          fontFamily: theme.typography.button.fontFamily,
          fontWeight: theme.typography.button.fontWeight,
          fontSize: theme.typography.button.fontSize,
          lineHeight: theme.typography.button.lineHeight,
          letterSpacing: theme.typography.button.letterSpacing,
          color: theme.palette.primary.contrastText,
          '&:hover': { backgroundColor: theme.palette.grey[900] },
          '&:disabled': { backgroundColor: theme.palette.grey[300], color: theme.palette.text.disabled },
        }}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: theme.spacing(1),
      }}>
        <Typography variant="body2" sx={{ 
          ...theme.typography.body2,
          color: theme.palette.text.secondary,
          whiteSpace: 'nowrap',
        }}>
          Don't have an account?
        </Typography>
        <Link
          href="/signup"
          sx={{
            ...theme.typography.body2,
            color: theme.palette.primary.light || theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
            whiteSpace: 'nowrap',
          }}
        >
          Sign up
        </Link>
      </Box>
    </Box>
  );
}
