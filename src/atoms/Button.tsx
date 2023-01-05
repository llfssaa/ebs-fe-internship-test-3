import React from 'react';
import './atoms.scss';

interface ButtonProps {
  onClick: () => void;
}
function Button({ onClick, children }: React.PropsWithChildren<ButtonProps>) {
  return (
    <button className="button" type="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default Button;
