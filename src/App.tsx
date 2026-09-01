import { useState } from "react";

import type { Field, FieldType } from "./type.ts";


function App() {
const [fields, setFields] = useState<Field[]>([]); 
console.log(fields)

const addField = (type: FieldType) => { 
  const newField = { 
    id: crypto.randomUUID(),
    type: type, 
    label: type === "group" ? "New Group" : `New ${type} field`, 
    required: false, 
     ...(type === "group" ? { children: [] } : {}), 
    }
    
  setFields((prev) => [...prev, newField]); 
};

const updateField = (id: string, updates: Partial<Field>) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  return (
    <main className="app">
      <header>
        <h1>Configurable Form Builder</h1>
        <p>Build form and preview it live.</p>
      </header>

      <div className="toolbar">
        <button onClick={() => {addField('text')}}>+ Text</button>
        <button onClick={() => {addField('number')}}>+ Number</button>
        <button onClick={() => {addField('group')}}>+ Group</button>
      </div>

      {/* Builder */} 
       <section className="panel">
          <h2>Fields</h2>

          {fields.length === 0 && (
            <p className="empty">No fields yet.</p>
          )}

          {fields.map((field) => (
            <div className="field" key={field.id}>
              <div className="field-header">
                <strong>{field.type}</strong>

                <button onClick={() => deleteField(field.id)}>
                  Delete
                </button>
              </div>

              <input
                value={field.label}
                placeholder="Label"
                onChange={(e) =>
                  updateField(field.id, {
                    label: e.target.value,
                  })
                }
              />

              <label>
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    updateField(field.id, {
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
                      updateField(field.id, {
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
                      updateField(field.id, {
                        max:
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                      })
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </section>

    </main>
  );
}


export default App;
