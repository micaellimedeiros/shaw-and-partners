import React from "react";

import Dashboard from "./pages/Dashboard";
import { AppProvider } from "./context/AppContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Dashboard />;
      <GlobalStyle />
      <ToastContainer />
    </AppProvider>
  );
};

export default App;
