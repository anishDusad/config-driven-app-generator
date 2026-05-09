interface Props {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

export default function NumberField({
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

      <input
        type="number"
        name={name}
        placeholder={placeholder}
        className="border rounded-lg px-3 py-2"
      />
    </div>
  );
}