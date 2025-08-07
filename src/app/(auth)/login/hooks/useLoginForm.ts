import type { LoginFormHook } from '../types';
import { useFormValidation } from './useFormValidation';
import { useInputChange } from './useInputChange';
import { useLoginFormState } from './useLoginFormState';
import { useSubmitHandler } from './useSubmitHandler';

export const useLoginForm = (): LoginFormHook => {
  const state = useLoginFormState();

  const validateForm = useFormValidation(state.formData, state.setErrors);
  const handleInputChange = useInputChange(
    state.errors,
    state.loginState,
    state.setFormData,
    state.setErrors,
    state.setLoginState,
  );
  const handleSubmit = useSubmitHandler(
    state.formData,
    validateForm,
    state.setIsLoading,
    state.setLoginState,
  );

  return {
    formData: state.formData,
    errors: state.errors,
    isLoading: state.isLoading,
    loginState: state.loginState,
    handleInputChange,
    handleSubmit,
  };
};
