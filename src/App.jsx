import "./App.css";
import SignUpForm from "../components/SignUpForm";
import Authenticate from "../components/Authenticate";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  const clearToken = () => {
    setToken(null);
  };

  return (
    <div className="container">
      <SignUpForm setToken={setToken} clearToken={clearToken} />
      <Authenticate token={token} />
    </div>
  );
}

export default App;
