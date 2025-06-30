import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./pages/Layout";


function App() {
  
  return (
    <BrowserRouter >
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter >
  );
}

export default App;
