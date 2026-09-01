import { useCallback, useState } from 'react';

import type { Field, FieldType } from './type.ts';
import { FieldPreview } from './components/FieldPreview.tsx';
import FieldEditor from './components/FieldEditor.tsx';
import { addChildField, deleteField, updateFields } from './utils.ts';

function App() {
  const [fields, setFields] = useState<Field[]>([]);
  const [json, setJson] = useState('');

  const addField = (type: FieldType) => {
    const newField = {
      id: crypto.randomUUID(),
      type: type,
      label: type === 'group' ? 'New Group' : `New ${type} field`,
      required: false,
      ...(type === 'group' ? { children: [] } : {}),
    };

    setFields((prev) => [...prev, newField]);
  };

  const updateField = useCallback((id: string, updates: Partial<Field>) => {
    setFields((prev) => updateFields(prev, id, updates));
  }, []);

  const handleDeleteField = useCallback((id: string) => {
    setFields((prev) => deleteField(prev, id));
  }, []);

  const handleAddChild = useCallback((groupId: string, type: FieldType) => {
    const child = {
      id: crypto.randomUUID(),
      type: type,
      label: type === 'group' ? 'New Group' : `New ${type} field`,
      required: false,
      ...(type === 'group' ? { children: [] } : {}),
    };

    setFields((prev) => addChildField(prev, groupId, child));
  }, []);

  const exportJson = () => {
    setJson(JSON.stringify(fields, null, 2));
  };

  const importJson = () => {
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid configuration');
      }
      setFields(parsed);
    } catch {
      alert('Invalid JSON configuration');
    }
  };

  return (
    <main className="app">
      <header>
        <h1>Configurable Form Builder</h1>
        <p>Build form and preview it live.</p>
      </header>

      <div className="toolbar">
        <button
          onClick={() => {
            addField('text');
          }}
        >
          + Text
        </button>
        <button
          onClick={() => {
            addField('number');
          }}
        >
          + Number
        </button>
        <button
          onClick={() => {
            addField('group');
          }}
        >
          + Group
        </button>
      </div>

      <div className="layout">
        {/* Builder */}
        <section className="panel">
          <h2>Fields</h2>

          {fields.length === 0 && <p className="empty">No fields yet.</p>}

          {fields.map((field) => (
            <FieldEditor
              field={field}
              onDelete={handleDeleteField}
              onUpdate={updateField}
              onAddChild={handleAddChild}
            />
          ))}
        </section>

        {/* Preview */}
        <section className="panel">
          <h2>Live Preview</h2>

          <form onSubmit={(e) => e.preventDefault()}>
            {fields.map((field) => (
              <FieldPreview key={field.id} field={field} />
            ))}

            {fields.length > 0 && (
              <button type="submit" style={{ marginTop: '16px' }}>
                Submit
              </button>
            )}
          </form>
        </section>
      </div>

      <section className="panel json-panel">
        <h2>Configuration JSON</h2>

        <div className="json-actions">
          <button type="button" onClick={exportJson}>
            {' '}
            Export{' '}
          </button>
          <button type="button" onClick={importJson}>
            {' '}
            Import{' '}
          </button>
        </div>

        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder="Paste configuration JSON here..."
        />
      </section>
    </main>
  );
}

export default App;
