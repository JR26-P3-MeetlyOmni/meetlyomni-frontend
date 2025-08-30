import React from 'react';

/**
 * Generic hook for managing step field state with validation
 * Reduces code duplication across step components
 */
export function useStepField<T extends string>(
  initialValue: T,
  onChange?: (value: T, isValid: boolean) => void,
) {
  const [isValid, setIsValid] = React.useState(false);
  const latestValueRef = React.useRef<T>(initialValue);

  // Update ref when initial value changes
  React.useEffect(() => {
    latestValueRef.current = initialValue;
  }, [initialValue]);

  const handleValueChange = React.useCallback(
    (value: T) => {
      latestValueRef.current = value;
      onChange?.(value, isValid);
    },
    [isValid, onChange],
  );

  const handleValidationChange = React.useCallback(
    (valid: boolean) => {
      setIsValid(valid);
      onChange?.(latestValueRef.current, valid);
    },
    [onChange],
  );

  return {
    isValid,
    handleValueChange,
    handleValidationChange,
  } as const;
}
