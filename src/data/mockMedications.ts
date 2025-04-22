
import { ProcedureDetail } from "@/types";

export const data: Record<string, ProcedureDetail> = {
  "1": {
    id: "1",
    name: "Blood Test",
    date: "2025-05-01",
    doctor: "Dr. Smith",
    location: "St Thomas' Hospital, London",
    description: "A routine blood test to check your general health status.",
    dos: [
      "Drink plenty of water before the test",
      "Bring your NHS number",
      "Wear a short-sleeved shirt or loose sleeves",
      "Tell the phlebotomist if you're nervous about needles"
    ],
    donts: [
      "Don't eat for 8-12 hours before the test (if fasting is required)",
      "Don't drink alcohol the night before",
      "Don't do strenuous exercise right before the test",
      "Don't forget to mention any medications you're taking"
    ],
    preparations: [
      "Schedule the test for early morning if fasting is required",
      "Get a good night's sleep",
      "Bring your appointment letter",
      "Allow extra time for registration"
    ]
  },
  "2": {
    id: "2",
    name: "MRI Scan",
    date: "2025-06-15",
    doctor: "Dr. Johnson",
    location: "Royal London Hospital",
    description: "Magnetic Resonance Imaging (MRI) scan to create detailed images of your internal organs.",
    dos: [
      "Remove all metal objects (jewelry, watches, etc.)",
      "Wear comfortable clothing without metal fasteners",
      "Arrive 30 minutes before your appointment",
      "Follow breathing instructions during the scan"
    ],
    donts: [
      "Don't wear makeup or hair products",
      "Don't bring metal objects into the scanner room",
      "Don't move during the scan",
      "Don't be afraid to use the emergency button if needed"
    ],
    preparations: [
      "Inform staff of any metal implants or devices",
      "Tell staff if you're claustrophobic",
      "Use the bathroom before the procedure",
      "Remove any patches (nicotine, hormone, etc.)"
    ]
  }
};
