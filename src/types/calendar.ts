export interface PublicHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number;
  types: string[];
}

export interface CountryType {
  countryCode: string;
  name: string;
}

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[];
}

export interface Task {
  id: number | string;
  title: string;
  date: string;
}

export interface Day {
  date: string; // "YYYY-MM-DD"
  tasks: Task[];
}
