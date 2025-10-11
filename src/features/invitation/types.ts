export type InvitationRequest = {
  email: string;
  message?: string;
};

export type InvitationResponse = {
  message: string;
  success: boolean;
};

export type AcceptInvitationRequest = {
  email: string;
  password: string;
  token: string;
};

export type AcceptInvitationResponse = {
  message: string;
  success: boolean;
};

export type InvitationState = {
  isLoading: boolean;
  error: string | null;
  success: boolean;
};
