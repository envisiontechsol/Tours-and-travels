import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <div>
      <ToastContainer />
      <AppRoutes />
    </div>
  );
};

export default App;
