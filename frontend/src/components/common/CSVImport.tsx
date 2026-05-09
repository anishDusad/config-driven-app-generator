"use client";

import Papa from "papaparse";

import { EntityConfig } from "@/types/config";

import { API_URL } from "@/lib/api/config";

interface Props {
  entity: EntityConfig;

  onImportSuccess: () => void;
}

export default function CSVImport({
  entity,
  onImportSuccess,
}: Props) {
  async function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    Papa.parse(file, {
      header: true,

      skipEmptyLines: true,

      complete: async (results) => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const response = await fetch(
            `${API_URL}/api/records/${entity.name}/bulk`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify({
                records: results.data,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              "Failed to import CSV"
            );
          }

          alert(
            "CSV imported successfully"
          );

          onImportSuccess();
        } catch (error) {
          console.error(error);

          alert("CSV import failed");
        }
      },
    });
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            CSV Import
          </h2>

          <p className="text-gray-500">
            Upload CSV records dynamically
          </p>
        </div>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50"
        />
      </div>
    </div>
  );
}