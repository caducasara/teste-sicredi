import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ItensList from '.';
import { Dragon } from '../../@types/DragonsInterface';

describe('ItensList component', () => {
  const mockDragon: Dragon = {
    id: '123',
    name: 'Firedrake',
    type: 'Fire',
    imageUrl: 'https://example.com/dragon.png',
    histories: [''],
    createdAt: '30-06-2025'
  };

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ItensList dragon={mockDragon} />
      </MemoryRouter>
    );

  it('Renders the dragon name', () => {
    renderComponent();

    expect(screen.getByRole('heading', { name: mockDragon.name })).toBeInTheDocument();
  });

  it('Renders the dragon type', () => {
    renderComponent();
    
    expect(screen.getByText(`Tipo: ${mockDragon.type}`)).toBeInTheDocument();
  });

  it('Renders the dragon image with correct alt text', () => {
    renderComponent();
    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockDragon.imageUrl);
    expect(image).toHaveAttribute('alt', `Imagem do dragão ${mockDragon.name}`);
  });

  it('Renders the link with correct href', () => {
    renderComponent();
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/dragon/${mockDragon.id}`);
  });
});