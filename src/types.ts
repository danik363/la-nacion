export interface LifeInsuranceRequest {
  age: number;
  beneficiaries: number;
  occupation: string;
  healthStatus: 'Chronic' | 'PartialDisability' | 'TotalDisability' | 'None';
  plan: 'Basic' | 'Premium';
  features: string[];
}

export interface HomeInsuranceRequest {
  province: string;
  location: string;
  rooms: number;
  dwellingType: 'House' | 'Apartment';
  occupants: number;
  plan: 'Basic' | 'Premium';
  features: string[];
}

export interface QuoteResponse {
  type: 'Life' | 'Home';
  premium: number;
  currency: string;
  unavailableFeatures?: string[];
  details: any;
}
