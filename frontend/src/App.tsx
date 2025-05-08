import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route
          path="/adminDashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
  )
};

export default App;
