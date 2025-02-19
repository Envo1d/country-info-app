interface CountryData {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export default interface FlagsResponse {
  error: boolean;
  msg: string;
  data: CountryData[];
}
