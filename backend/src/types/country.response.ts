import { PopulationData } from './population.response';

export interface Country {
  countryCode: string;
  name: string;
}

export interface DetailedCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: DetailedCountry[];
}

export interface DetailedResponse {
  countryName: string;
  officialName: string;
  borders: DetailedCountry[];
  populationData: PopulationData[];
  flagUrl: string;
}
