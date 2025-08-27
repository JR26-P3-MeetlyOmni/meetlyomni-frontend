// /home/lukelyu/p3/meetlyomni-frontend/src/app/(auth)/signup/components/companyName/CompanyNameStep.stories.tsx
import { MUIProvider } from '@/components/Providers/MUIProvider';

import type { Meta, StoryObj } from '@storybook/nextjs';

import CompanyNameStep from './CompanyNameStep';

const meta = {
  title: 'Auth/Signup/CompanyNameStep',
  component: CompanyNameStep,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    Story => (
      <MUIProvider>
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </MUIProvider>
    ),
  ],
} satisfies Meta<typeof CompanyNameStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: { onNext: () => {} },
};
