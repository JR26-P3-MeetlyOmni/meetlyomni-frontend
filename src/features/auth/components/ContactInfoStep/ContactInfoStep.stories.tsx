// src/features/auth/components/ContactInfoStep/ContactInfoStep.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';

import ContactInfoStep from './ContactInfoStep';
import type { NextPayload } from './ContactInfoStep.hook';

const onNext: (p: NextPayload) => void = () => {};
const onBack = () => {};

const meta: Meta<typeof ContactInfoStep> = {
  title: 'Auth/Signup/ContactInfoStep',
  component: ContactInfoStep,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { onNext, onBack },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
