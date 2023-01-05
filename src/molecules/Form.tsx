import React from 'react';
import FormInput from '../atoms/FormInput';
import './molecules.scss';

interface FormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  city: string;
}
function Form({ handleChange, city }: FormProps) {
  return (
    <form className="form">
      <div className="input">
        <FormInput value={city} onChange={handleChange} />
      </div>
    </form>
  );
}

export default Form;
