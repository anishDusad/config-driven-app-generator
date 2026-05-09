interface Props {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

export default function TextAreaField({
  label,
  name,
  placeholder,
  required,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">
        {label}

        {required && <span className="text-red-500"> *</span>}
      </label>

      <textarea
        name={name}
        placeholder={placeholder}
        className="border rounded-lg px-3 py-2 min-h-[120px]"
      />
    </div>
  );
}