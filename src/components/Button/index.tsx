import "./styles.css"
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`btn ${variant}`} {...rest}>
      {children}
    </button>
  );
}