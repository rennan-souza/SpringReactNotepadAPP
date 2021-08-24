import "react-toastify/dist/ReactToastify.css";
import './App.css';

import Routes from './Routes';
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { AuthContext, AuthContextData } from "./AuthContext";

function App() {

  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    autheticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
