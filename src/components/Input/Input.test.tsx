import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '.';

describe('Input component', () => {
  it('Renders the input element', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Renders the label when provided', () => {
    render(<Input label="Username" />);

    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });

  it('Does not render the label when not provided', () => {
    render(<Input />);

    expect(screen.queryByLabelText(/username/i)).not.toBeInTheDocument();
  });

  it('Adds the input-error class when there is an error', () => {
    render(<Input error="Invalid input" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('input-error');
  });

  it('Accepts additional props placeholder', () => {
    render(<Input placeholder="Enter your name" />);

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
  });

  it('Calls onChange when input changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'John' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});