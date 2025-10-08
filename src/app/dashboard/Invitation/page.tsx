import AdminOnlyWrapper from './components/AdminOnlyWrapper';
import InvitationForm from './components/InvitationForm';

export default function InvitationPage() {
  return (
    <AdminOnlyWrapper>
      <InvitationForm />
    </AdminOnlyWrapper>
  );
}
