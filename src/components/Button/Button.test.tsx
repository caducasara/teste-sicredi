import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '.';


describe('Button component', () => {
  it('Renders with default variant', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn primary');
  });

  it('Renders with variant "secondary"', () => {
    render(<Button variant="secondary">Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toHaveClass('btn secondary');
  });

  it('Renders with variant "danger"', () => {
    render(<Button variant="danger">Delete</Button>);

    const button = screen.getByRole('button', { name: /delete/i });

    expect(button).toHaveClass('btn danger');
  });

  it('Rasses additional props', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    const button = screen.getByRole('button', { name: /click/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Renders children correctly', () => {
    render(<Button><span>Nested</span></Button>);
    
    const button = screen.getByRole('button', { name: /nested/i });
    expect(button).toBeInTheDocument();
  });
});