import type { Field } from "../type.ts";

interface FieldEditorProps {
  field: Field;
  onUpdate: (id: string, updates: Partial<Field>) => void;
  onDelete: (id: string) => void;
};

export default function FieldEditor({
  field,
  onUpdate,
  onDelete,
}: FieldEditorProps) {
  return (
    <div className="field">
      <div className="field-header">
        <strong>{field.type}</strong>

        <button
          type="button"
          onClick={() => onDelete(field.id)}
        >
          Delete
        </button>
      </div>

      <input
        value={field.label}
        placeholder="Label"
        onChange={(e) =>
          onUpdate(field.id, {
            label: e.target.value,
          })
        }
      />

      <label>
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) =>
            onUpdate(field.id, {
              required: e.target.checked,
            })
          }
        />
        Required
      </label>

      {field.type === "number" && (
        <div className="number-options">
          <input
            type="number"
            placeholder="Min"
            value={field.min ?? ""}
            onChange={(e) =>
              onUpdate(field.id, {
                min:
                  e.target.value === ""
                    ? undefined
                    : Number(e.target.value),
              })
            }
          />

          <input
            type="number"
            placeholder="Max"
            value={field.max ?? ""}
            onChange={(e) =>
              onUpdate(field.id, {
                max:
                  e.target.value === ""
                    ? undefined
                    : Number(e.target.value),
              })
            }
          />
        </div>
      )}

      {field.type === "group" && (
        <div className="group-children">
          {field.children?.map((child) => (
            <FieldEditor
              key={child.id}
              field={child}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

