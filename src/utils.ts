import type { Field } from "./type";

function updateFields(
  fields: Field[],
  id: string,
  updates: Partial<Field>
): Field[] {
  return fields.map((field) => {
    if (field.id === id) {
      return {
        ...field,
        ...updates,
      };
    }

    if (field.type === "group") {
      return {
        ...field,
        children: updateFields(
          field.children ?? [],
          id,
          updates
        ),
      };
    }

    return field;
  });
}

function deleteField(
  fields: Field[],
  id: string
): Field[] {
  return fields
    .filter((field) => field.id !== id)
    .map((field) => {
      if (field.type === "group") {
        return {
          ...field,
          children: deleteField(
            field.children ?? [],
            id
          ),
        };
      }

      return field;
    });
}

export { deleteField, updateFields }
