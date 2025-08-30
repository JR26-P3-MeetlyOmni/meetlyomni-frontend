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
        // Never persist secrets - strip password fields before saving
        const {
          password: _password,
          passwordValid: _passwordValid,
          ...safeData
        } = pendingDataRef.current;
        setItem('signupFormData', safeData);
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

  const cancelPendingSave = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    pendingDataRef.current = {};
  }, []);

  return { debouncedSave, cancelPendingSave };
}

// Custom hook for form handlers
function useFormHandlers(
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
  debouncedSave: (updates: Partial<FormState>) => void,
) {
  const handleCompany = React.useCallback(
    (name: string, isValid: boolean) => {
      setFormState(prev => {
        const next = { ...prev, companyName: name, companyValid: isValid };
        debouncedSave(next);
        return next;
      });
    },
    [setFormState, debouncedSave],
  );

  const handleEmail = React.useCallback(
    (val: string, isValid: boolean) => {
      setFormState(prev => {
        const next = { ...prev, email: val, emailValid: isValid };
        debouncedSave(next);
        return next;
      });
    },
    [setFormState, debouncedSave],
  );

  const handlePassword = React.useCallback(
    (val: string, isValid: boolean) => {
      // Do not persist password to storage
      setFormState(prev => ({ ...prev, password: val, passwordValid: isValid }));
    },
    [setFormState],
  );

  const handleContact = React.useCallback(
    (name: string, phoneNum: string, isValid: boolean) => {
      setFormState(prev => {
        const next = {
          ...prev,
          contactName: name,
          phone: phoneNum,
          contactValid: isValid,
        };
        debouncedSave(next);
        return next;
      });
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
  cancelPendingSave: () => void,
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
        cancelPendingSave();
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
  }, [formState, setIsLoading, setError, setSuccess, removeItem, cancelPendingSave]);

  return { handleSubmit };
}

export function useFormData() {
  const isClient = useClient();
  const { setItem, removeItem, cleanupOldData } = useLocalStorage();

  const [formState, setFormState] = React.useState<FormState>(getInitialFormState());
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  // Use debounced save to reduce localStorage writes
  const { debouncedSave, cancelPendingSave } = useDebouncedSave(setItem);

  // Load data from localStorage after component mounts
  React.useEffect(() => {
    if (!isClient) return;

    cleanupOldData();
    // Always clear form data on page refresh to ensure fresh start
    removeItem('signupFormData');
    removeItem('signupCurrentStep');
    setFormState(getInitialFormState());
  }, [isClient, cleanupOldData, removeItem]);

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
    cancelPendingSave,
  );

  const clearFormData = React.useCallback(() => {
    cancelPendingSave();
    setFormState(getInitialFormState());
    setError(null);
    setSuccess(false);
    removeItem('signupFormData');
    removeItem('signupCurrentStep');
  }, [removeItem, cancelPendingSave]);

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
