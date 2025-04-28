import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
    </Routes>
  )
};

export default App;
