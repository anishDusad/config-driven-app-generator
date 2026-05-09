import { LabelType } from "@/types/config";

export function getLabel(
  label: LabelType | undefined,
  language: string
): string {
  if (!label) {
    return "";
  }

  if (typeof label === "string") {
    return label;
  }

  return (
    label[language] ||
    label["en"] ||
    Object.values(label)[0] ||
    ""
  );
}