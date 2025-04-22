
// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Profile {
  id: string;
  full_name: string;
  date_of_birth?: string;
  blood_group?: string;
  height?: number;
  weight?: number;
  updated_at: string;
}

export interface EmergencyContact {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  contact_number: string;
  created_at: string;
}

// Medication types
export interface Medication {
  id: string;
  user_id: string;
  name: string;
  dosage?: string;
  quantity?: string;
  start_date: string;
  end_date: string;
  time: string;
  instructions?: string;
  created_at: string;
}

export interface TodayMedication extends Medication {
  status: 'pending' | 'taken' | 'skipped';
  isImmediate?: boolean;
}

// Procedure types
export interface Procedure {
  id: string;
  user_id: string;
  name: string;
  date: string;
  doctor: string;
  location?: string;
  notes?: string;
  description?: string;
  dos: string[];
  donts: string[];
  preparations: string[];
  created_at: string;
}

export type ThemeMode = 'light' | 'dark';
