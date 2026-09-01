export type FieldType = 'text' | 'number' | 'group'

export interface Field { 
    id: string; 
    type: FieldType; 
    label: string; 
    required: boolean; 
    min?: number; 
    max?: number; 
    children?: Field[]; 
};