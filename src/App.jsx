// src/routes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TripInCity from "./components/user/chatRag";
import Dashbord from "./components/admin/Dashbord";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TripInCity />} />
        <Route path="/dashboard" element={<Dashbord />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
