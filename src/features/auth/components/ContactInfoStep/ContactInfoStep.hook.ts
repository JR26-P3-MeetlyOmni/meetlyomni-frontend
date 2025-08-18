// src/features/auth/components/ContactInfoStep/ContactInfoStep.hook.ts
import { type ChangeEvent, type FormEvent, useCallback, useMemo, useState } from 'react';

export const NAME_PLACEHOLDER = 'Alex Li';
export const PHONE_PLACEHOLDER = '0XXXXXXXXX or XXXXXXXXX';
export type NextPayload = { name: string; phone: string };

const LOCAL_PHONE_REGEX = /^(0\d{9}|[1-9]\d{8})$/;

export function useContactInfoForm(onNext: (p: NextPayload) => void, onBack: () => void) {
  const [name, setName] = useState('');
  const [phoneLocal, setPhoneLocal] = useState('');
  const [touched, setTouched] = useState({ name: false, phone: false });

  const nameValid = name.trim().length > 0;
  const phoneValid = LOCAL_PHONE_REGEX.test(phoneLocal);

  const e164Phone = useMemo(() => {
    if (!phoneValid) return '';
    const local = phoneLocal.startsWith('0') ? phoneLocal.slice(1) : phoneLocal;
    return `+61${local}`;
  }, [phoneLocal, phoneValid]);

  const showNameError = touched.name && !nameValid;
  const showPhoneError = phoneLocal.length > 0 && !phoneValid;

  const setTouchedField = (f: 'name' | 'phone') => setTouched(prev => ({ ...prev, [f]: true }));

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handlePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '');
    const withoutCc = digits.startsWith('61') ? digits.slice(2) : digits;
    const local = withoutCc.slice(0, 10);
    setPhoneLocal(local);
  }, []);

  const handleNameBlur = useCallback(() => setTouchedField('name'), []);
  const handlePhoneBlur = useCallback(() => setTouchedField('phone'), []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setTouched({ name: true, phone: true });
      if (!nameValid || !phoneValid) return;
      onNext({ name: name.trim(), phone: e164Phone });
    },
    [nameValid, phoneValid, e164Phone, name, onNext],
  );

  return {
    name,
    phone: phoneLocal,
    isFormValid: nameValid && phoneValid,
    showNameError,
    showPhoneError,
    handleNameChange,
    handleNameBlur,
    handlePhoneChange,
    handlePhoneBlur,
    handleSubmit,
    handleBack: onBack,
  };
}
