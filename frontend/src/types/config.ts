export type FieldType =
  | "text"
  | "email"
  | "number"
  | "textarea";

export type LabelType =
  | string
  | {
      [key: string]: string;
    };

export interface FieldConfig {
  name: string;

  label?: LabelType;

  type: FieldType;

  required?: boolean;

  placeholder?: string;
}

export interface EntityConfig {
  name: string;

  label?: LabelType;

  fields: FieldConfig[];
}

export interface AppConfig {
  appName: LabelType;

  entities: EntityConfig[];
}