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
}) => (
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
        width: '35px',
        height: '14px',
        margin: '0 377px 6px 0',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1,
        letterSpacing: 'normal',
        color: '#14183b',
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
          borderRadius: 2,
          backgroundColor: '#ffffff',
          '& fieldset': { borderColor: errors.email ? '#d32f2f' : '#e0e0e0' },
          '&:hover fieldset': { borderColor: errors.email ? '#d32f2f' : '#1976d2' },
          '&.Mui-focused fieldset': { borderColor: errors.email ? '#d32f2f' : '#1976d2' },
        },
        '& .MuiInputLabel-root': { 
          display: 'none', // Hide the label since we have a separate label above
        },
        '& .MuiInputBase-input': {
          fontSize: '0.9rem',
        },
        mb: 1,
      }}
    />
    {errors.email && (
      <Typography
        variant="body2"
        sx={{
          color: '#d32f2f',
          fontSize: '0.75rem',
          marginTop: '4px',
          marginBottom: '8px',
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
        width: '63px',
        height: '14px',
        margin: '0 349px 6px 0',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1,
        letterSpacing: 'normal',
        color: '#14183b',
        textAlign: 'left',
      }}
    >
      Password
    </Typography>

    <TextField
      required
      fullWidth
      name="password"
      type={showPassword ? 'text' : 'password'}
      id="password"
      autoComplete="current-password"
      value={formData.password}
      onChange={(e) => handleInputChange('password', e.target.value)}
      onBlur={(e) => handleInputBlur('password', e.target.value)}
      error={!!errors.password}
      placeholder="Password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((prev: boolean) => !prev)}
              edge="end"
              sx={{ color: '#666666' }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: '#ffffff',
          '& fieldset': { borderColor: errors.password ? '#d32f2f' : '#e0e0e0' },
          '&:hover fieldset': { borderColor: errors.password ? '#d32f2f' : '#1976d2' },
          '&.Mui-focused fieldset': { borderColor: errors.password ? '#d32f2f' : '#1976d2' },
        },
        '& .MuiInputLabel-root': { 
          display: 'none', // Hide the label since we have a separate label above
        },
        '& .MuiInputBase-input': {
          fontSize: '0.9rem',
        },
        mb: 1,
      }}
    />
    {errors.password && (
      <Typography
        variant="body2"
        sx={{
          color: '#d32f2f',
          fontSize: '0.75rem',
          marginTop: '4px',
          marginBottom: '8px',
          textAlign: 'left',
        }}
      >
        {errors.password}
      </Typography>
    )}

    <Box sx={{ textAlign: 'left', mb: 2 }}>
      <Link
        href="/forgot-password"
        variant="body2"
        sx={{
          width: '114px',
          height: '14px',
          margin: '8px 298px 0 0',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 500,
          fontStretch: 'normal',
          fontStyle: 'normal',
          lineHeight: 1,
          letterSpacing: 'normal',
          color: '#2269f0',
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
        width: '412px',
        height: '38px',
        margin: '16px 0 24px',
        padding: '12px 183px 12px 182px',
        borderRadius: '6px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        backgroundColor: '#14183b',
        textTransform: 'none',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1,
        letterSpacing: 'normal',
        color: '#fff',
        '&:hover': { backgroundColor: '#0f1228' },
        '&:disabled': { backgroundColor: '#e0e0e0', color: '#757575' },
      }}
    >
      {isSubmitting ? 'Signing in...' : 'Sign in'}
    </Button>

    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: 0 
    }}>
      <Typography variant="body2" sx={{ 
        width: '148px',
        height: '14px',
        margin: '0 8px 0 0',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1,
        letterSpacing: 'normal',
        color: '#44484e',
        whiteSpace: 'nowrap',
      }}>
        Don't have an account?
      </Typography>
      <Link
        href="/signup"
        sx={{
          width: '48px',
          height: '14px',
          margin: '0 0 0 8px',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 500,
          fontStretch: 'normal',
          fontStyle: 'normal',
          lineHeight: 1,
          letterSpacing: 'normal',
          color: '#2269f0',
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
