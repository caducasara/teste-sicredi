import './styles.css';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; 
}

export default function Input({ label, error, ...rest }: InputProps) {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input className={`input-field ${error ? 'input-error' : ''}`} {...rest} />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}