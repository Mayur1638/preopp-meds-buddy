
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Dummy procedure info for the title card
const procedure = {
  name: "Colonoscopy",
  date: "2024-05-03",
  doctor: "Dr. Sneha Menon",
  hospital: "City Hospital"
};

const dos = [
  "Follow pre-procedure fasting as instructed.",
  "Bring all relevant medical documents to the hospital.",
  "Take prescribed medications unless told otherwise.",
  "Arrange for a companion to assist you on the procedure day.",
  "Ask questions if you are unsure about any instructions.",
];

const donts = [
  "Do not eat or drink when advised to fast.",
  "Avoid taking over-the-counter medicines unless prescribed.",
  "Do not ignore any allergies or medical history before the procedure.",
  "Avoid strenuous activity immediately after the procedure.",
  "Do not hesitate to report discomfort to hospital staff.",
];

export function DosAndDontsDetails() {
  const navigate = useNavigate();

  // Format date prettily
  const formattedDate = new Date(procedure.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <div className="max-w-2xl mx-auto py-7 space-y-7">
      {/* Title card with info and back button */}
      <Card className="bg-primary/5 border shadow flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center pb-3">
          <div className="flex items-center">
            <button
              aria-label="Back"
              onClick={() => navigate("/procedures")}
              className="mr-2 flex items-center text-primary-700 hover:text-primary focus:outline-none"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <CardTitle className="text-xl">
              {procedure.name}
            </CardTitle>
          </div>
          <div className="flex flex-col items-end md:items-center">
            <CardDescription className="text-sm font-medium">{formattedDate}</CardDescription>
            <CardDescription className="text-sm">{procedure.hospital}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col gap-1">
          <div className="text-base text-gray-700 font-medium">{procedure.doctor}</div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Do's Card */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">Do's</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-green-900">
              {dos.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {/* Don'ts Card */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg text-red-800">Don'ts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-red-900">
              {donts.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
