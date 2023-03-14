import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import DashBoard from "./pages/dashboard/DashBoard";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const PrivateRoutes = () => {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<DashBoard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
