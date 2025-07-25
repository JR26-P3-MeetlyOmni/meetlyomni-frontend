import { ScenariosSection } from '@/components/LandingPage/applicable-scenarios';
import { SAMPLE_SCENARIOS } from '@/components/LandingPage/applicable-scenarios/data';

export default function HomePage() {
  return (
    <main>
      {/* Scenarios Section */}
      <ScenariosSection scenarios={SAMPLE_SCENARIOS} />
    </main>
  );
}
