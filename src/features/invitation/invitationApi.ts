import { apiFetch, ensureXsrfCookie } from '../../api/api';
import type {
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  InvitationRequest,
  InvitationResponse,
} from './types';

export const sendInvitationApi = async (
  invitationData: InvitationRequest,
  signal?: AbortSignal,
): Promise<InvitationResponse> => {
  await ensureXsrfCookie();
  return apiFetch<InvitationResponse>('/invitation/invite', {
    method: 'POST',
    body: JSON.stringify(invitationData),
    signal,
  });
};

export const acceptInvitationApi = async (
  invitationData: AcceptInvitationRequest,
  signal?: AbortSignal,
): Promise<AcceptInvitationResponse> => {
  await ensureXsrfCookie();
  return apiFetch<AcceptInvitationResponse>('/invitation/accept', {
    method: 'POST',
    body: JSON.stringify(invitationData),
    signal,
  });
};
