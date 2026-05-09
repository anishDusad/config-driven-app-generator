import TextField from "@/components/fields/TextField";
import EmailField from "@/components/fields/EmailField";
import NumberField from "@/components/fields/NumberField";
import TextAreaField from "@/components/fields/TextAreaField";

export const fieldRegistry = {
  text: TextField,

  email: EmailField,

  number: NumberField,

  textarea: TextAreaField,
};