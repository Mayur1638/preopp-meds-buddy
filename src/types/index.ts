
// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
}

// Medication types
export interface Medication {
  id: string;
  name: string;
  quantity: string;
  startDate: string;
  endDate: string;
  time: string;
  dosage?: string;
  instructions?: string;
}

export interface TodayMedication extends Medication {
  status: 'pending' | 'taken' | 'skipped';
  isImmediate?: boolean;
}

// Procedure types
export interface Procedure {
  id: string;
  name: string;
  date: string;
  doctor: string;
  location?: string;
  notes?: string;
}

export interface ProcedureDetail extends Procedure {
  description: string;
  dos: string[];
  donts: string[];
  preparations: string[];
}

export type ThemeMode = 'light' | 'dark';
