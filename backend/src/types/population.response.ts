export interface PopulationData {
  year: number;
  month: number;
}

interface CountryData {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationData[];
}

export interface PopulationResponse {
  error: boolean;
  msg: string;
  data: CountryData[];
}
