import React from 'react';

import { signup, type SignupRequest } from '../../../../features/auth';
import { useClient } from './useClient';
import { useLocalStorage } from './useLocalStorage';

// Form state interface
interface FormState {
  companyName: string;
  companyValid: boolean;
  email: string;
  emailValid: boolean;
  password: string;
  passwordValid: boolean;
  contactName: string;
  phone: string;
  contactValid: boolean;
}

// Initialize form state
const getInitialFormState = (): FormState => ({
  companyName: '',
  companyValid: false,
  email: '',
  emailValid: false,
  password: '',
  passwordValid: false,
  contactName: '',
  phone: '',
  contactValid: false,
});

// Custom hook for debounced localStorage saving
function useDebouncedSave(setItem: (key: string, value: unknown) => void) {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pendingDataRef = React.useRef<Partial<FormState>>({});

  const debouncedSave = React.useCallback(
    (updates: Partial<FormState>) => {
      // Merge with pending data
      pendingDataRef.current = { ...pendingDataRef.current, ...updates };

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout for 300ms debounce
      timeoutRef.current = setTimeout(() => {
        setItem('signupFormData', pendingDataRef.current);
        pendingDataRef.current = {}; // Clear pending data after saving
      }, 300);
    },
    [setItem],
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedSave;
}

// Custom hook for form handlers
function useFormHandlers(
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
  debouncedSave: (updates: Partial<FormState>) => void,
) {
  const handleCompany = React.useCallback(
    (name: string, isValid: boolean) => {
      setFormState(prev => ({ ...prev, companyName: name, companyValid: isValid }));
      debouncedSave({ companyName: name, companyValid: isValid });
    },
    [setFormState, debouncedSave],
  );

  const handleEmail = React.useCallback(
    (val: string, isValid: boolean) => {
      setFormState(prev => ({ ...prev, email: val, emailValid: isValid }));
      debouncedSave({ email: val, emailValid: isValid });
    },
    [setFormState, debouncedSave],
  );

  const handlePassword = React.useCallback(
    (val: string, isValid: boolean) => {
      setFormState(prev => ({ ...prev, password: val, passwordValid: isValid }));
      debouncedSave({ password: val, passwordValid: isValid });
    },
    [setFormState, debouncedSave],
  );

  const handleContact = React.useCallback(
    (name: string, phoneNum: string, isValid: boolean) => {
      setFormState(prev => ({
        ...prev,
        contactName: name,
        phone: phoneNum,
        contactValid: isValid,
      }));
      debouncedSave({ contactName: name, phone: phoneNum, contactValid: isValid });
    },
    [setFormState, debouncedSave],
  );

  return { handleCompany, handleEmail, handlePassword, handleContact };
}

// Custom hook for submit functionality
function useSubmitHandler(
  formState: FormState,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setSuccess: (success: boolean) => void,
  removeItem: (key: string) => void,
) {
  const handleSubmit = React.useCallback(async () => {
    if (
      !(
        formState.companyValid &&
        formState.emailValid &&
        formState.passwordValid &&
        formState.contactValid
      )
    )
      return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const signupData: SignupRequest = {
        userName: formState.contactName,
        email: formState.email,
        password: formState.password,
        organizationName: formState.companyName,
        phoneNumber: formState.phone,
      };

      const result = await signup(signupData);

      if (result.success) {
        setSuccess(true);
        removeItem('signupFormData');
        removeItem('signupCurrentStep');
      } else {
        setError(result.message);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [formState, setIsLoading, setError, setSuccess, removeItem]);

  return { handleSubmit };
}

export function useFormData() {
  const isClient = useClient();
  const { getItem, setItem, removeItem, cleanupOldData } = useLocalStorage();

  const [formState, setFormState] = React.useState<FormState>(getInitialFormState());
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  // Use debounced save to reduce localStorage writes
  const debouncedSave = useDebouncedSave(setItem);

  // Load data from localStorage after component mounts
  React.useEffect(() => {
    if (!isClient) return;

    cleanupOldData();
    try {
      const saved = (getItem('signupFormData') as Partial<FormState> | null) ?? null;
      if (saved && typeof saved === 'object') {
        setFormState(prev => ({ ...prev, ...saved }));
      }
      // Do NOT clear 'signupCurrentStep' here; let the step manager restore it.
    } catch {
      // If parsing fails or storage unavailable, reset to initial.
      setFormState(getInitialFormState());
    }
  }, [isClient, cleanupOldData, getItem]);

  const { handleCompany, handleEmail, handlePassword, handleContact } = useFormHandlers(
    setFormState,
    debouncedSave,
  );

  const { handleSubmit } = useSubmitHandler(
    formState,
    setIsLoading,
    setError,
    setSuccess,
    removeItem,
  );

  const clearFormData = React.useCallback(() => {
    setFormState(getInitialFormState());
    setError(null);
    setSuccess(false);
    removeItem('signupFormData');
    removeItem('signupCurrentStep');
  }, [removeItem]);

  return {
    ...formState,
    isLoading,
    error,
    success,
    handleCompany,
    handleEmail,
    handlePassword,
    handleContact,
    handleSubmit,
    clearFormData,
  };
}
