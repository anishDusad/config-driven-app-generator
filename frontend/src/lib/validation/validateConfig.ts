import { AppConfig, EntityConfig } from "@/types/config";

const allowedFieldTypes = [
  "text",
  "email",
  "number",
  "textarea",
];

export function validateConfig(
  config: any
): AppConfig {
  if (!config || typeof config !== "object") {
    throw new Error("Invalid config object");
  }

  if (!config.appName) {
    config.appName = "Untitled Application";
  }

  if (!Array.isArray(config.entities)) {
    config.entities = [];
  }

  const sanitizedEntities: EntityConfig[] =
    config.entities.map((entity: any, entityIndex: number) => {
      const sanitizedEntity: EntityConfig = {
        name:
          entity.name ||
          `entity_${entityIndex}`,

        label:
          entity.label ||
          entity.name ||
          `Entity ${entityIndex + 1}`,

        fields: [],
      };

      if (!Array.isArray(entity.fields)) {
        entity.fields = [];
      }

      sanitizedEntity.fields = entity.fields.map(
        (field: any, fieldIndex: number) => {
          return {
            name:
              field.name ||
              `field_${fieldIndex}`,

            label:
              field.label ||
              field.name ||
              `Untitled Field ${fieldIndex + 1}`,

            type: allowedFieldTypes.includes(
              field.type
            )
              ? field.type
              : "text",

            required:
              field.required || false,

            placeholder:
              field.placeholder || "",
          };
        }
      );

      return sanitizedEntity;
    });

  return {
    appName: config.appName,

    entities: sanitizedEntities,
  };
}