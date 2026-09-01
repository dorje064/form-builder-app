import type { Field } from "../type";
import "./style.css"


export function FieldPreview({ field }: { field: Field }) {
  if (field.type === "group") {
    return (
      <fieldset>
        <legend>
          {field.label}
          {field.required && " *"}
        </legend>

        {field.children?.map((child) => (
          <FieldPreview key={child.id} field={child} />
        ))}
      </fieldset>
    );
  }

  return (
    <label className="preview-field">
      {field.label}
      {field.required && " *"}

      <input
        type={field.type}
        required={field.required}
        min={field.type === "number" ? field.min : undefined}
        max={field.type === "number" ? field.max : undefined}
      />
    </label>
  );
}