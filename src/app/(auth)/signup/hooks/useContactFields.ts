import React from 'react';

/**
 * Hook for managing contact info fields (name and phone)
 * Specialized version of useStepField for contact information
 */
export function useContactFields(
  initialName: string,
  initialPhone: string,
  onChange?: (name: string, phone: string, valid: boolean) => void,
) {
  const [nameValid, setNameValid] = React.useState(false);
  const [phoneValid, setPhoneValid] = React.useState(false);

  const latestNameRef = React.useRef<string>(initialName);
  const latestPhoneRef = React.useRef<string>(initialPhone);

  // Update refs when initial values change
  React.useEffect(() => {
    latestNameRef.current = initialName;
    latestPhoneRef.current = initialPhone;
  }, [initialName, initialPhone]);

  const isFormValid = nameValid && phoneValid;

  const handleNameChange = React.useCallback(
    (value: string) => {
      latestNameRef.current = value;
      onChange?.(value, latestPhoneRef.current, nameValid && phoneValid);
    },
    [onChange, nameValid, phoneValid],
  );

  const handleNameValidationChange = React.useCallback(
    (valid: boolean) => {
      setNameValid(valid);
      onChange?.(latestNameRef.current, latestPhoneRef.current, valid && phoneValid);
    },
    [onChange, phoneValid],
  );

  const handlePhoneChange = React.useCallback(
    (value: string) => {
      latestPhoneRef.current = value;
      onChange?.(latestNameRef.current, value, nameValid && phoneValid);
    },
    [onChange, nameValid, phoneValid],
  );

  const handlePhoneValidationChange = React.useCallback(
    (valid: boolean) => {
      setPhoneValid(valid);
      onChange?.(latestNameRef.current, latestPhoneRef.current, nameValid && valid);
    },
    [onChange, nameValid],
  );

  return {
    isFormValid,
    handleNameChange,
    handleNameValidationChange,
    handlePhoneChange,
    handlePhoneValidationChange,
  } as const;
}
