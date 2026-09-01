import type { Field, FieldType } from "../type";

type FieldEditorProps = {
  field: Field;
  onUpdate: (id: string, updates: Partial<Field>) => void;
  onDelete: (id: string) => void;
  onAddChild: (groupId: string, type: FieldType) => void;
};

export default function FieldEditor({
  field,
  onUpdate,
  onDelete,
  onAddChild,
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
          <div className="toolbar">
            <button type="button" onClick={() => onAddChild(field.id, "text")} >
              + Text
            </button>

            <button type="button" onClick={() => onAddChild(field.id, "number") }>
              + Number
            </button>

            <button type="button" onClick={() => onAddChild(field.id, "group") }>
              + Group
            </button>
          </div>

          {field.children?.length ? (
            field.children.map((child) => (
              <FieldEditor
                key={child.id}
                field={child}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAddChild={onAddChild}
              />
            ))
          ) : (
            <p className="empty">
              No fields in this group.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

