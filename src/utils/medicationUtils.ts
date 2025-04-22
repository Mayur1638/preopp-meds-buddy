
import { Medication, TodayMedication } from "@/types";

export const generateTodayMedications = (medications: Medication[]): TodayMedication[] => {
  const today = new Date().toISOString().split('T')[0];
  const currentHour = new Date().getHours();
  
  return medications
    .filter(med => med.start_date <= today && med.end_date >= today)
    .map(med => {
      const medHour = parseInt(med.time.split(':')[0]);
      const isImmediate = medHour >= currentHour && medHour <= currentHour + 1;
          
      return {
        ...med,
        status: 'pending' as const,
        isImmediate
      };
    })
    .sort((a, b) => {
      const timeA = parseInt(a.time.split(':')[0]);
      const timeB = parseInt(b.time.split(':')[0]);
      return timeA - timeB;
    });
};
