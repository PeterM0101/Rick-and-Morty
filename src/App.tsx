import React, { useEffect } from "react";
import "./scss/styles.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Characters from "./pages/Characters/Characters";
import AddNewPhoto from "./components/AddNewPhoto/AddNewPhoto";
import Login from "./pages/Login/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/photo" element={<AddNewPhoto />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Characters />} />
      </Routes>
    </Router>
  );
};

export default App;
