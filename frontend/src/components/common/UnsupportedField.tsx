interface Props {
  type: string;
}

export default function UnsupportedField({ type }: Props) {
  return (
    <div className="border border-red-400 bg-red-50 text-red-600 rounded-lg p-4">
      Unsupported field type: <strong>{type}</strong>
    </div>
  );
}