import type { Meta, StoryObj } from '@storybook/nextjs';

import QRCodeComponent from './QRCode';

const meta: Meta<typeof QRCodeComponent> = {
  title: 'Components/QRCode',
  component: QRCodeComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: 'URL to encode in the QR code',
    },
    size: {
      control: { type: 'range', min: 32, max: 128, step: 8 },
      description: 'Size of the QR code in pixels',
    },
    label: {
      control: 'text',
      description: 'Optional label to display above the QR code',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: 'https://example.com',
    size: 64,
  },
};

export const WithLabel: Story = {
  args: {
    url: 'https://example.com',
    size: 64,
    label: 'Scan to visit',
  },
};

export const LargeSize: Story = {
  args: {
    url: 'https://example.com',
    size: 128,
  },
};

export const SmallSize: Story = {
  args: {
    url: 'https://example.com',
    size: 32,
  },
};

export const WechatExample: Story = {
  args: {
    url: 'https://jiangren.com.au/contact',
    size: 64,
    label: 'Wechat',
  },
};

export const ContactUsExample: Story = {
  args: {
    url: 'http://localhost:3000',
    size: 64,
    label: 'Contact Us',
  },
};

export const LongURL: Story = {
  args: {
    url: 'https://very-long-url-example.com/with/many/path/segments/and/parameters?param1=value1&param2=value2',
    size: 64,
    label: 'Long URL Example',
  },
};
