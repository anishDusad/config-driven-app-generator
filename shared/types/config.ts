export type FieldType =
  | "text"
  | "email"
  | "number"
  | "textarea";

export interface FieldConfig {
  name: string;

  label?: string;

  type: FieldType;

  required?: boolean;

  placeholder?: string;
}

export interface EntityConfig {
  name: string;

  label?: string;

  fields: FieldConfig[];
}

export interface AppConfig {
  appName: string;

  entities: EntityConfig[];
}