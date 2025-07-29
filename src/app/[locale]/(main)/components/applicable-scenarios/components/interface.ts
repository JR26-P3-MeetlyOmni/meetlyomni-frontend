export interface ScenarioData {
  id: string;
  title: string;
  descriptions: string[];
  image: string;
  imageAlt: string;
}

export interface ScenarioCardProps {
  scenario: ScenarioData;
  className?: string;
}

export interface ScenariosSectionProps {
<<<<<<< HEAD
  scenarios?: ScenarioData[];
=======
  scenarios: ScenarioData[];
>>>>>>> 0bc462f (refactor:change all emotion style to mui style)
  title?: string;
  className?: string;
}
