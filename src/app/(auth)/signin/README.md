# Sign In Module

This module contains a complete sign-in page with form validation, responsive design, and decorative elements.

## File Structure

```
signin/
├── README.md                           # This file
├── page.tsx                            # Main signin page component
├── page.stories.tsx                    # Storybook stories for the page
├── page.test.tsx                       # Unit tests for the page
├── components/
│   ├── DecorativeElements.tsx          # Background decorative elements
│   └── SignInForm.tsx                  # Form component with validation
└── hooks/
    └── useSignInForm.ts                # Form state management and validation logic (includes validation functions)
```

## Features

- **Form Validation**: Email and password validation with real-time error feedback
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **State Management**: Local state management with React hooks
- **Error Handling**: Comprehensive error handling and user feedback
- **Password Visibility Toggle**: Show/hide password functionality

## How to Open/Use

### Direct URL Access

Navigate to the signin page using the following URL pattern:

```
/[locale]/signin
```


### Component Usage

The signin page can be used as a standalone page or integrated into other components:

```tsx
import SignInPage from './page';

// Use as a page component
<SignInPage />
```

### Hook Usage

The `useSignInForm` hook provides form state management and validation:

```tsx
import { useSignInForm } from './hooks/useSignInForm';

const MyComponent = () => {
  const {
    formData,
    errors,
    showPassword,
    isSubmitting,
    isFormValid,
    handleInputChange,
    handleInputBlur,
    handleSubmit,
    setShowPassword,
  } = useSignInForm();

  // Use the hook's returned values and functions
};
```

## Validation Rules

- **Email**: Must be a valid email format
- **Password**: Must be at least 8 characters with uppercase, lowercase, and number

## Future Enhancements

- Integration with Redux for global state management
- API service integration for authentication
- Enhanced error handling and user feedback
- Multi-factor authentication support
