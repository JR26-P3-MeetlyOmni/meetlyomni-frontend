export type VerificationStatus =
  | 'success'
  | 'failed'
  | 'already_confirmed'
  | 'not_found'
  | 'verifying';

export interface VerificationPageProps {
  status: VerificationStatus;
}
