import React from 'react';

export function useFormData() {
  const [companyName, setCompanyName] = React.useState('');
  const [companyValid, setCompanyValid] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [emailValid, setEmailValid] = React.useState(false);

  const [password, setPassword] = React.useState('');
  const [passwordValid, setPasswordValid] = React.useState(false);

  const [contactName, setContactName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [contactValid, setContactValid] = React.useState(false);

  const handleCompany = React.useCallback((name: string, isValid: boolean) => {
    setCompanyName(name);
    setCompanyValid(isValid);
  }, []);

  const handleEmail = React.useCallback((val: string, isValid: boolean) => {
    setEmail(val);
    setEmailValid(isValid);
  }, []);

  const handlePassword = React.useCallback((val: string, isValid: boolean) => {
    setPassword(val);
    setPasswordValid(isValid);
  }, []);

  const handleContact = React.useCallback((name: string, phoneNum: string, isValid: boolean) => {
    setContactName(name);
    setPhone(phoneNum);
    setContactValid(isValid);
  }, []);

  const handleSubmit = React.useCallback(() => {
    if (!(companyValid && emailValid && passwordValid && contactValid)) return;
    // TODO: Replace with real signup API call
    // For now, just log the collected data
    // eslint-disable-next-line no-console
    console.log({ companyName, email, password, contactName, phone });
  }, [
    companyValid,
    emailValid,
    passwordValid,
    contactValid,
    companyName,
    email,
    password,
    contactName,
    phone,
  ]);

  return {
    companyName,
    companyValid,
    email,
    emailValid,
    password,
    passwordValid,
    contactName,
    phone,
    contactValid,
    handleCompany,
    handleEmail,
    handlePassword,
    handleContact,
    handleSubmit,
  };
}
