import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import DashBoard from "./pages/dashboard/DashBoard";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Loading from "./components/loading/Loading";
import Users from "./pages/Users/Users";
import SingleUser from "./pages/singleUser/SingleUser";
import Groups from "./pages/Groups/Groups";
import GroupPage from "./pages/GroupPage/GroupPage";

function App() {
  const { currentUser, loading } = useContext(AuthContext);

  const PrivateRoutes = () => {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  };

  const RedirectRoutes = () => {
    return !currentUser ? <Outlet /> : <Navigate to="/" />;
  };

  if (loading) return <Loading />;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<DashBoard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:username" element={<SingleUser />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/:id" element={<GroupPage />} />
          </Route>
          <Route element={<RedirectRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
