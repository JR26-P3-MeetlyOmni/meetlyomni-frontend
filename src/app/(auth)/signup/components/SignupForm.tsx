'use client';

import { ValidatedInput } from './FieldInput';

export function SignupForm() {
  return (
    <>
      <ValidatedInput
        kind="email"
        label="Email:"
        placeholder="123456@gmail.com"
        required
        // onValidChange={(ok) => console.log('email valid?', ok)}
      />
    </>
  );
}
