import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";

const NavBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const admin = Boolean(token);

    const handleLogin = () => {
      navigate("/adminlogin"); // replace with your login page route
    };

    const handleLogout = () => {
      localStorage.removeItem('token'); // remove token
      navigate("/adminlogin"); // redirect to login after logout
    };

    return (
        <div className="border-b">
  <div className="container mx-auto px-4 py-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    {/* Top Row for Small Devices (Logo + Logout) */}
    <div className="flex justify-between items-center sm:hidden">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          DA
        </div>
        <span className="font-bold text-xl ml-4">Disaster Aid</span>
      </div>

      {/* Logout Button for Small Devices */}
      {admin ? (
        <Button 
          variant="outline"
          className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Button 
          variant="outline"
          className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600"
          onClick={handleLogin}
        >
          LogIn
        </Button>
      )}
    </div>

    {/* Full Navbar for Medium and Up */}
    <div className="hidden sm:flex justify-between items-center w-full">
      {/* Logo (again, for sm and up) */}
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          DA
        </div>
        <span className="font-bold text-xl ml-4">Disaster Aid</span>
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-2">
        {admin ? (
          <>
            <Button variant="ghost" className="hover:cursor-pointer">Home</Button>
            <Button variant="ghost" className="hover:cursor-pointer">Dashboard</Button>
            <Button 
              variant="outline"
              className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button 
            variant="outline"
            className="bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600"
            onClick={handleLogin}
          >
            LogIn
          </Button>
        )}
      </div>
    </div>

    {/* Stack Buttons for Small Devices */}
    {admin && (
      <div className="flex flex-col sm:hidden gap-2">
        <Button variant="ghost" className="hover:cursor-pointer">Home</Button>
        <Button variant="ghost" className="hover:cursor-pointer">Dashboard</Button>
      </div>
    )}
  </div>
</div>

    )
}

export default NavBar;