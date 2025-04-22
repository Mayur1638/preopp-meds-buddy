
// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
}

// Patient types
export interface Patient {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  dob: string;
  height: number;
  weight: number;
  allergies: string;
  gender: string;
  blood_group: string;
  created_at: string;
}

// Emergency Contact types
export interface EmergencyContact {
  id: string;
  user_id: string;
  name: string;
  contact: string;
  relationship: string;
  created_at: string;
}

// Medication types
export interface Medication {
  id: string;
  user_id: string;
  name: string;
  quantity: string;
  start_date: string;
  end_date: string;
  time: string;
  dosage: string;
  instructions: string;
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
  location: string;
  notes: string;
  dos: string[];
  donts: string[];
  preparations: string[];
  created_at: string;
}

// Add the missing ProcedureDetail type
export interface ProcedureDetail extends Procedure {
  description?: string;
}

export type ThemeMode = 'light' | 'dark';
