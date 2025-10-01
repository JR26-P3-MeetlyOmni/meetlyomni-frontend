import { selectCanGoToStep, selectIsFormComplete } from '@/features/signup/signupSelectors';
import { type SignupFormState, type Step } from '@/features/signup/signupSlice';
import {
  clearForm,
  setCompanyData,
  setContactData,
  setEmailData,
  setPasswordData,
  setStep,
} from '@/features/signup/signupSlice';
import { submitSignup } from '@/features/signup/signupThunks';
import type { AppDispatch } from '@/store/store';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function useReduxSignupForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Direct state access - much simpler than selectors
  const signupState = useSelector((state: { signup: SignupFormState }) => state.signup);
  const canGoToStep = useSelector(selectCanGoToStep);
  const isFormComplete = useSelector(selectIsFormComplete);

  // Handle successful signup redirect
  useEffect(() => {
    if (signupState.success && signupState.email) {
      router.push(`/email-sent?email=${encodeURIComponent(signupState.email)}`);
    }
  }, [signupState.success, signupState.email, router]);

  // Step navigation
  const setCurrentStep = useCallback(
    (step: Step) => {
      dispatch(setStep(step));
    },
    [dispatch],
  );

  const goBack = useCallback(() => {
    const steps: Step[] = ['company', 'email', 'password', 'contact'];
    const currentIndex = steps.indexOf(signupState.currentStep);
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      if (prevStep) {
        dispatch(setStep(prevStep));
      }
    }
  }, [signupState.currentStep, dispatch]);

  const goNext = useCallback(() => {
    const steps: Step[] = ['company', 'email', 'password', 'contact'];
    const currentIndex = steps.indexOf(signupState.currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      if (nextStep) {
        dispatch(setStep(nextStep));
      }
    }
  }, [signupState.currentStep, dispatch]);

  // Form handlers
  const handleCompanyChange = useCallback(
    (name: string, isValid: boolean) => {
      dispatch(setCompanyData({ name, isValid }));
    },
    [dispatch],
  );

  const handleEmailChange = useCallback(
    (email: string, isValid: boolean) => {
      dispatch(setEmailData({ email, isValid }));
    },
    [dispatch],
  );

  const handlePasswordChange = useCallback(
    (password: string, isValid: boolean) => {
      dispatch(setPasswordData({ password, isValid }));
    },
    [dispatch],
  );

  const handleContactChange = useCallback(
    (name: string, phone: string, isValid: boolean) => {
      dispatch(setContactData({ name, phone, isValid }));
    },
    [dispatch],
  );

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (!isFormComplete) return;

    try {
      await dispatch(submitSignup()).unwrap();
    } catch {
      // Error is already handled by the thunk's rejected case
    }
  }, [dispatch, isFormComplete]);

  // Clear form
  const clearFormData = useCallback(() => {
    dispatch(clearForm());
  }, [dispatch]);

  return {
    // State - direct access from signupState
    step: signupState.currentStep,
    companyName: signupState.companyName,
    companyValid: signupState.companyValid,
    email: signupState.email,
    emailValid: signupState.emailValid,
    password: signupState.password,
    passwordValid: signupState.passwordValid,
    contactName: signupState.contactName,
    phone: signupState.phone,
    contactValid: signupState.contactValid,
    isLoading: signupState.isLoading,
    error: signupState.error,
    success: signupState.success,

    // Actions
    setStep: setCurrentStep,
    goBack,
    goNext,
    handleCompanyChange,
    handleEmailChange,
    handlePasswordChange,
    handleContactChange,
    handleSubmit,
    clearFormData,
    canGoTo: canGoToStep,
  };
}
