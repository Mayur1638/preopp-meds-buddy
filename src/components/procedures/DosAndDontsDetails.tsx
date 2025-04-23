
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DosAndDontsDetails() {
  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Procedure Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-green-700 mb-2">Do's</h2>
            <ul className="list-disc pl-5">
              <li>Follow pre-procedure fasting as instructed.</li>
              <li>Bring all relevant medical documents to the hospital.</li>
              <li>Take prescribed medications unless told otherwise.</li>
              <li>Arrange for a companion to assist you on the procedure day.</li>
              <li>Ask questions if you are unsure about any instructions.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-red-700 mb-2">Don'ts</h2>
            <ul className="list-disc pl-5">
              <li>Do not eat or drink when advised to fast.</li>
              <li>Avoid taking over-the-counter medicines unless prescribed.</li>
              <li>Do not ignore any allergies or medical history before the procedure.</li>
              <li>Avoid strenuous activity immediately after the procedure.</li>
              <li>Do not hesitate to report discomfort to hospital staff.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
