
import { Medication, Procedure } from "@/types";

export const MOCK_MEDICATIONS: Medication[] = [
  {
    id: "1",
    user_id: "user123",
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
    user_id: "user123",
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
    user_id: "user123",
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
    user_id: "user123",
    name: "Colonoscopy",
    date: "2025-05-10",
    doctor: "Dr. Smith",
    location: "General Hospital",
    notes: "Outpatient procedure",
    description: "A colonoscopy is a procedure to look at the inside of your colon.",
    dos: ["Follow the bowel preparation instructions exactly", "Complete the entire prep solution"],
    donts: ["Don't eat solid food the day before", "Don't take medications that thin your blood"],
    preparations: ["Stop iron supplements 5 days before", "Clear liquid diet the day before"],
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "user123",
    name: "Knee Arthroscopy",
    date: "2025-06-15",
    doctor: "Dr. Johnson",
    location: "Orthopedic Center",
    notes: "Arrive 2 hours before procedure",
    description: "Arthroscopy is a minimally invasive surgical procedure used to diagnose and treat problems inside a joint.",
    dos: ["Arrange for transportation home", "Follow fasting instructions"],
    donts: ["Don't eat or drink after midnight", "Don't take aspirin or blood thinners"],
    preparations: ["Get pre-op blood work done", "Stop certain medications as directed"],
    created_at: new Date().toISOString()
  }
];
