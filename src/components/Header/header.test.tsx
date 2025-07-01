import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '.';

import * as ReactRouterDom from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));
jest.mock('../../hooks/UseAuth');

describe('Header component', () => {
  const mockNavigate = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (ReactRouterDom.useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (ReactRouterDom.useLocation as jest.Mock).mockReturnValue({ pathname: '/' });
    (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });
  });

  it('Renders Create Dragon on list page', () => {
    (ReactRouterDom.useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    render(<Header />);

    expect(screen.getByRole('button', { name: /create dragon/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('Renders Voltar on other pages', () => {
    (ReactRouterDom.useLocation as jest.Mock).mockReturnValue({ pathname: '/dragon/123' });

    render(<Header />);

    expect(screen.getByRole('button', { name: /Voltar/i })).toBeInTheDocument();
  });

  it('Navigates to create page when clicking Create Dragon', () => {
    (ReactRouterDom.useLocation as jest.Mock).mockReturnValue({ pathname: '/' });

    render(<Header />);
    
    fireEvent.click(screen.getByRole('button', { name: /create dragon/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/dragon/create');
  });

  it('Navigates back when clicking Voltar', () => {
    (ReactRouterDom.useLocation as jest.Mock).mockReturnValue({ pathname: '/dragon/123' });

    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: /voltar/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('Calls logout when clicking Logout', () => {
    render(<Header />);
    
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalled();
  });
});