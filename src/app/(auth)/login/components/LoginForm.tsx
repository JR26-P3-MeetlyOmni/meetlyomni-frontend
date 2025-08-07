import React from 'react';

import type { LoginFormProps } from '../types';
import { FORM_FIELDS, FormFieldRenderer } from './FormFieldRenderer';
import {
  ForgotPasswordLink,
  LoginFormContainer,
  OrDivider,
  OrText,
  SignInButton,
  SignUpLink,
  SignUpSection,
  SignUpText,
} from './LoginFormStyles';
import { MessageAlert } from './MessageAlert';
import { ThirdPartyButtons } from './ThirdPartyButtons';

export const LoginForm: React.FC<LoginFormProps> = ({ formHook }) => {
  const { formData, errors, isLoading, loginState, handleInputChange, handleSubmit } = formHook;

  return (
    <LoginFormContainer>
      <form onSubmit={handleSubmit}>
        <MessageAlert loginState={loginState} />

        {/* Render form fields using table-driven method */}
        {FORM_FIELDS.map(fieldConfig => (
          <FormFieldRenderer
            key={fieldConfig.key}
            config={fieldConfig}
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        ))}

        <ForgotPasswordLink href="#" variant="body2">
          Forgot Password?
        </ForgotPasswordLink>

        <SignInButton type="submit" disabled={isLoading} fullWidth>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </SignInButton>

        <OrDivider>
          <OrText>or</OrText>
        </OrDivider>

        <ThirdPartyButtons />

        <SignUpSection>
          <SignUpText>Don&apos;t have an account?</SignUpText>
          <SignUpLink href="/signup" variant="body2">
            Sign up
          </SignUpLink>
        </SignUpSection>
      </form>
    </LoginFormContainer>
  );
};
