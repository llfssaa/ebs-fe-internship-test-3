import React from 'react';
import './atoms.scss';

interface FormInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function FormInput({ value, onChange }: FormInputProps) {
  return <input className="input" type="text" value={value} onChange={onChange} />;
}

export default FormInput;
