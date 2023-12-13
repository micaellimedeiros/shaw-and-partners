import React from "react";

import Dashboard from "./pages/Dashboard";
import { AppProvider } from "./context/AppContext";

import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Dashboard />;
      <GlobalStyle />
    </AppProvider>
  );
};

export default App;
