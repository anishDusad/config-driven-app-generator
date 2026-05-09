"use client";

import { useEffect, useState } from "react";

import DynamicForm from "@/components/renderer/DynamicForm";

import DynamicTable from "@/components/renderer/DynamicTable";

import CSVImport from "@/components/common/CSVImport";

import AuthForm from "@/components/common/AuthForm";

import { AppConfig } from "@/types/config";

import { loadConfig } from "@/lib/config/loadConfig";

import { getLabel } from "@/lib/config/getLabel";

import { API_URL } from "@/lib/api/config";

export default function HomePage() {
  const [config, setConfig] =
    useState<AppConfig | null>(null);

  const [records, setRecords] =
    useState<any[]>([]);

  const [language, setLanguage] =
    useState("en");

  const [authenticated, setAuthenticated] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function fetchRecords(
    entityName: string
  ) {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/records/${entityName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch records"
        );
      }

      const data = await response.json();

      setRecords(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function initializeApp() {
      try {
        const token =
          localStorage.getItem("token");

        if (token) {
          setAuthenticated(true);
        }

        const data =
          await loadConfig();

        setConfig(data);

        if (
          token &&
          data.entities.length > 0
        ) {
          fetchRecords(
            data.entities[0].name
          );
        }
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load application config"
        );
      } finally {
        setLoading(false);
      }
    }

    initializeApp();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading application...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-6">
        <AuthForm
          onAuthenticated={() => {
            setAuthenticated(true);

            if (
              config &&
              config.entities.length > 0
            ) {
              fetchRecords(
                config.entities[0].name
              );
            }
          }}
        />
      </main>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (config.entities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No entities configured
      </div>
    );
  }

  const entity = config.entities[0];

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {getLabel(
                config.appName,
                language
              )}
            </h1>

            <p className="text-gray-500 mt-1">
              Config-driven AI application
              platform
            </p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value
                )
              }
              className="border border-gray-200 rounded-xl px-4 py-2 bg-gray-50"
            >
              <option value="en">
                English
              </option>

              <option value="hi">
                Hindi
              </option>
            </select>

            <button
              onClick={() => {
                localStorage.removeItem(
                  "token"
                );

                window.location.reload();
              }}
              className="bg-red-500 text-white px-5 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <CSVImport
          entity={entity}
          onImportSuccess={() =>
            fetchRecords(entity.name)
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-2">
            <DynamicForm
              entity={entity}
              language={language}
              onSuccess={() =>
                fetchRecords(entity.name)
              }
            />
          </div>

          <div className="xl:col-span-3">
            <DynamicTable
              entity={entity}
              records={records}
              language={language}
            />
          </div>
        </div>
      </div>
    </main>
  );
}