import { EntityConfig } from "@/types/config";

import { getLabel } from "@/lib/config/getLabel";

interface Props {
  entity: EntityConfig;

  records: any[];

  language: string;
}

export default function DynamicTable({
  entity,
  records,
  language,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">
          {getLabel(
            entity.label,
            language
          )}{" "}
          Records
        </h2>

        <p className="text-gray-500">
          Dynamically rendered records table
        </p>
      </div>

      {records.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center">
          <h3 className="text-xl font-semibold mb-2">
            No Records Yet
          </h3>

          <p className="text-gray-500">
            Create or import records to
            see them here
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {entity.fields.map(
                  (field) => (
                    <th
                      key={field.name}
                      className="text-left p-4 font-semibold border-b"
                    >
                      {getLabel(
                        field.label,
                        language
                      )}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-gray-50"
                >
                  {entity.fields.map(
                    (field) => (
                      <td
                        key={field.name}
                        className="p-4 border-b text-gray-700"
                      >
                        {record.data[
                          field.name
                        ]?.toString() ||
                          "-"}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}