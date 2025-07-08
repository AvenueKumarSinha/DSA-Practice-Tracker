import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { usernameContext } from "./Context/Context.jsx";

const Root = () => {
  const [username, setUsernameState] = useState(localStorage.getItem("username") || null);

    const setUsername = (name) => {
    if (name) {
      localStorage.setItem("username", name);
    } else {
      localStorage.removeItem("username");
    }
    setUsernameState(name);
  };


  return(
    <usernameContext.Provider value={{ username, setUsername }}>
      <App />
    </usernameContext.Provider>
  );
};

createRoot(document.getElementById('root')).render(<Root />)
