"use client";

import { useState } from "react";

import { EntityConfig } from "@/types/config";

import { fieldRegistry } from "@/lib/registry/fieldRegistry";

import UnsupportedField from "@/components/common/UnsupportedField";

import { getLabel } from "@/lib/config/getLabel";

import { API_URL } from "@/lib/api/config";

interface Props {
  entity: EntityConfig;

  onSuccess: () => void;

  language: string;
}

export default function DynamicForm({
  entity,
  onSuccess,
  language,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;

    setLoading(true);

    setSuccess("");

    setError("");

    try {
      const formData =
        new FormData(form);

      const values =
        Object.fromEntries(
          formData.entries()
        );

      const token =
        localStorage.getItem(
          "token"
        );

      const response = await fetch(
        `${API_URL}/api/records/${entity.name}`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to create record"
        );
      }

      setSuccess(
        "Record created successfully"
      );

      form.reset();

      onSuccess();
    } catch (err) {
      console.error(err);

      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {getLabel(
            entity.label,
            language
          )}
        </h2>

        <p className="text-gray-500">
          Dynamically generated form
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {entity.fields.map((field) => {
          const Component =
            fieldRegistry[
              field.type as keyof typeof fieldRegistry
            ];

          if (!Component) {
            return (
              <UnsupportedField
                key={field.name}
                type={field.type}
              />
            );
          }

          return (
            <div
              key={field.name}
              className={
                field.type ===
                "textarea"
                  ? "md:col-span-2"
                  : ""
              }
            >
              <Component
                label={getLabel(
                  field.label,
                  language
                )}
                name={field.name}
                placeholder={
                  field.placeholder
                }
                required={
                  field.required
                }
              />
            </div>
          );
        })}

        <div className="md:col-span-2">
          {success && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-4">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-xl py-4 font-medium text-lg"
          >
            {loading
              ? "Submitting..."
              : "Create Record"}
          </button>
        </div>
      </form>
    </div>
  );
}