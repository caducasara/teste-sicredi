import { createContext, useState, ReactNode, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  loggedIn: boolean,
  login: (username: string, password: string) => void,
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode 
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState(() => {
    const saved = localStorage.getItem('loggedIn');
    return saved === 'true';
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('loggedIn', String(loggedIn));
  }, [loggedIn]);

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === '1234') {
        setLoggedIn(true);
        navigate('/');
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  const logout = () => {
    setLoggedIn(false);
    navigate('/login');
  };


  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}