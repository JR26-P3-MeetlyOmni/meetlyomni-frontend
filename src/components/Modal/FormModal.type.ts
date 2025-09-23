export type FormModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children?: React.ReactNode;
  isLoading?: boolean;
  disabledSubmit?: boolean;
};
