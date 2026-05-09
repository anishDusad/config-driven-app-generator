import { AppConfig } from "@/types/config";

import { validateConfig } from "../validation/validateConfig";

export async function loadConfig(): Promise<AppConfig> {
  const response = await fetch("/configs/crm.json");

  if (!response.ok) {
    throw new Error("Failed to load config");
  }

  const rawConfig = await response.json();

  return validateConfig(rawConfig);
}