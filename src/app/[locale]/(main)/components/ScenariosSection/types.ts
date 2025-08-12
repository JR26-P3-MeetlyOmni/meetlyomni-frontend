export interface IScenarioConfig {
  id: string;
  image: string;
  descriptionCount: number;
}

export interface IScenarioData {
  id: string;
  title: string;
  descriptions: string[];
  image: string;
  imageAlt: string;
}

export interface IScenarioCardProps {
  scenario: IScenarioData;
  t: (key: string) => string;
}

export interface IScenariosSectionProps {
  t: (key: string) => string;
}
