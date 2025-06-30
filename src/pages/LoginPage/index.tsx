import { useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import "./styles.css";
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: any)=> {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="login-container">
        <div className="login-box">
            <h2>Login</h2>
            <form className ="login-form " onSubmit={handleSubmit}>
                <Input label="Usuario" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" />
                <Input label="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                <Button variant='primary' type="submit">Entrar</Button>
            </form>
        </div>
    </div>
  );
}