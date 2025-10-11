import AdminOnlyWrapper from './components/AdminOnlyWrapper';
import InvitationForm from './components/InvitationForm';
import InvitationPageLayout from './components/InvitationPageLayout';

export default function InvitationPage() {
  return (
    <InvitationPageLayout>
      <AdminOnlyWrapper>
        <InvitationForm />
      </AdminOnlyWrapper>
    </InvitationPageLayout>
  );
}
