
import { Medication, Procedure } from "@/types";

export const MOCK_MEDICATIONS: Medication[] = [
  {
    id: "1",
    user_id: "1",
    name: "Aspirin",
    quantity: "100mg",
    start_date: "2025-04-15",
    end_date: "2025-05-15",
    time: "08:00",
    dosage: "1 tablet",
    instructions: "Take with food",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "1",
    name: "Metoprolol",
    quantity: "50mg",
    start_date: "2025-04-10",
    end_date: "2025-04-30",
    time: "12:00",
    dosage: "1 tablet",
    instructions: "Take with water",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    user_id: "1",
    name: "Simvastatin",
    quantity: "20mg",
    start_date: "2025-04-01",
    end_date: "2025-06-01",
    time: "20:00",
    dosage: "1 tablet",
    instructions: "Take at bedtime",
    created_at: new Date().toISOString()
  }
];

export const MOCK_PROCEDURES: Procedure[] = [
  {
    id: "1",
    user_id: "1",
    name: "Colonoscopy",
    date: "2025-05-10",
    doctor: "Dr. Smith",
    location: "General Hospital",
    notes: "Outpatient procedure",
    dos: ["Follow diet instructions", "Complete prep solution"],
    donts: ["Don't eat solid food day before", "Don't take medications"],
    preparations: ["Stop iron supplements", "Clear liquid diet"],
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "1",
    name: "Knee Arthroscopy",
    date: "2025-06-15",
    doctor: "Dr. Johnson",
    location: "Orthopedic Center",
    notes: "Arrive 2 hours before procedure",
    dos: ["Arrange transportation", "Follow fasting instructions"],
    donts: ["Don't eat after midnight", "Don't wear contact lenses"],
    preparations: ["Get blood work done", "Stop certain medications"],
    created_at: new Date().toISOString()
  }
];
