import "./styles.css";
import useAuth from '../../hooks/UseAuth';
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreate= () => {
    navigate('/dragon/create')
  };

  const handleBack = () => {
    navigate(-1);
  };

  const isDragonListPage =
    location.pathname === '/';

  return (
    <header className="header-container">
        <div className="container">
          <div className="header-content">
            {
              !isDragonListPage ? (
                <Button onClick={handleBack} variant="primary">
                  Voltar
                </Button>
              ) : (
                <Button onClick={handleCreate} variant="primary">
                  Create Dragon
                </Button>
              )
            }
            <Button onClick={() => logout()} variant="secondary">Logout</Button>
          </div>
        </div>
    </header>
  );
}