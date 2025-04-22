
import { Medication, Procedure, ProcedureDetail } from "@/types";

export const MOCK_MEDICATIONS: Medication[] = [
  {
    id: "1",
    name: "Aspirin",
    quantity: "100mg",
    startDate: "2025-04-15",
    endDate: "2025-05-15",
    time: "08:00",
    dosage: "1 tablet",
    instructions: "Take with food"
  },
  {
    id: "2",
    name: "Metoprolol",
    quantity: "50mg",
    startDate: "2025-04-10",
    endDate: "2025-04-30",
    time: "12:00",
    dosage: "1 tablet",
    instructions: "Take with water"
  },
  {
    id: "3",
    name: "Simvastatin",
    quantity: "20mg",
    startDate: "2025-04-01",
    endDate: "2025-06-01",
    time: "20:00",
    dosage: "1 tablet",
    instructions: "Take at bedtime"
  }
];

export const MOCK_PROCEDURES: Procedure[] = [
  {
    id: "1",
    name: "Colonoscopy",
    date: "2025-05-10",
    doctor: "Dr. Smith",
    location: "General Hospital",
    notes: "Outpatient procedure"
  },
  {
    id: "2",
    name: "Knee Arthroscopy",
    date: "2025-06-15",
    doctor: "Dr. Johnson",
    location: "Orthopedic Center",
    notes: "Arrive 2 hours before procedure"
  }
];

export const data: Record<string, ProcedureDetail> = {
  "1": {
    id: "1",
    name: "Colonoscopy",
    date: "2025-05-10",
    doctor: "Dr. Smith",
    location: "General Hospital",
    notes: "Outpatient procedure",
    description: "A colonoscopy is a procedure to look at the inside of your colon.",
    dos: [
      "Follow the bowel preparation instructions exactly",
      "Complete the entire prep solution",
      "Stay hydrated with clear liquids",
      "Arrange for someone to drive you home"
    ],
    donts: [
      "Don't eat solid food the day before",
      "Don't take medications that thin your blood",
      "Don't wear jewelry or bring valuables",
      "Don't drive for 24 hours after the procedure"
    ],
    preparations: [
      "Stop iron supplements 5 days before",
      "Clear liquid diet the day before",
      "Complete bowel prep as directed",
      "Arrive 30 minutes before appointment"
    ]
  },
  "2": {
    id: "2",
    name: "Knee Arthroscopy",
    date: "2025-06-15",
    doctor: "Dr. Johnson",
    location: "Orthopedic Center",
    notes: "Arrive 2 hours before procedure",
    description: "Arthroscopy is a minimally invasive surgical procedure used to diagnose and treat problems inside a joint.",
    dos: [
      "Arrange for transportation home",
      "Follow fasting instructions",
      "Bring your insurance card",
      "Wear loose, comfortable clothing"
    ],
    donts: [
      "Don't eat or drink after midnight",
      "Don't take aspirin or blood thinners",
      "Don't wear contact lenses",
      "Don't apply lotions or perfumes"
    ],
    preparations: [
      "Get pre-op blood work done",
      "Stop certain medications as directed",
      "Prepare your home for recovery",
      "Have ice packs ready for recovery"
    ]
  }
};
