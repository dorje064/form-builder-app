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

function addChildField(
  fields: Field[],
  groupId: string,
  child: Field
): Field[] {
  return fields.map((field) => {

    //Group as children 
    if (field.id === groupId && field.type === "group") {
      return {
        ...field,
        children: [
          ...(field.children ?? []),
          child,
        ],
      };
    }

    if (field.type === "group") {
      return {
        ...field,
        children: addChildField(
          field.children ?? [],
          groupId,
          child
        ),
      };
    }

    return field;
  });
}



export { deleteField, updateFields, addChildField }
