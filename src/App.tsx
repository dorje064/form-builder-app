import { useState } from "react";

import type { Field, FieldType } from "./type.ts";


function App() {
const [fields, setFields] = useState<Field[]>([]); 
console.log(fields)

const addField = (type: FieldType) => { 
  const newField = { 
    id: crypto.randomUUID(),
    type: type, 
    label: `New ${type} field`, 
    required: false, 
     ...(type === "group" ? { children: [] } : {}), 
    }

  setFields((prev) => [...prev, newField]); 
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
    </main>
  );
}


export default App;
