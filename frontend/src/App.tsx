import React from "react";

import Dashboard from "./pages/Dashboard";
import { AppProvider } from "./context/AppContext";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Dashboard />;
    </AppProvider>
  );
};

export default App;
