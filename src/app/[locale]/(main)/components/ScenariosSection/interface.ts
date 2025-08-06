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
  scenarios?: ScenarioData[];
  title?: string;
  className?: string;
}
