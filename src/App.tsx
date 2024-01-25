import { useState } from "react";
import routes from "./routes/Routes";
import { useAuth } from "./context/AuthContext";
import { UserRolesEnum } from "./enums/UserRolesEnum";

import Navbar from "./components/nav/Navbar";
import Sidebar from "./components/nav/Sidebar";

import "./assets/styles/App.css";

function App() {
  const { userRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const hasToken = sessionStorage.getItem("bearer");

  if (!hasToken) {
    logout();
  }

  const isUserAuthenticated = userRole && userRole !== UserRolesEnum.GUEST;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const sidebarOpenedClass = "h-auto w-full lg:w-72";
  const sidebarClosedClass = "hidden h-auto w-72 lg:block";

  const responsiveSidebarToggledClass = isOpen
    ? sidebarOpenedClass
    : sidebarClosedClass;

  return (
    <main className="flex flex-col justify-between overflow-hidden h-screen ">
      {/* Conditionally render the Navbar based on user authentication */}
      {isUserAuthenticated && <Navbar onToggle={handleToggle} />}

      <div className="flex flex-col-reverse lg:flex-row transition-all w-full h-full">
        <div className="bg-sc-gray overflow-auto w-full h-full p-8">
          {routes}
        </div>

        {/* Conditionally render the Sidebar based on user authentication */}
        {isUserAuthenticated && (
          <div className={responsiveSidebarToggledClass}>
            <Sidebar />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
