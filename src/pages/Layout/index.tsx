import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import AppRoutes from "../../routes/AppRoutes";

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}
      {!isLoginPage ? (
        <div className="container">
          <AppRoutes />
        </div>
      ) : (
        <AppRoutes />
      )}
    </>
  );
}

export default Layout;
