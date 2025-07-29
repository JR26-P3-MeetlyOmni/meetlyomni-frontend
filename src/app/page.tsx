<<<<<<< HEAD
import { ScenariosSection } from './[locale]/(main)/components/applicable-scenarios';

export default function HomePage() {
  return (
    <main>
      {/* Scenarios Section */}
      <ScenariosSection />
    </main>
  );
=======
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en');
>>>>>>> a17400f (re-structure to app router structure & config i18n (#17))
}
