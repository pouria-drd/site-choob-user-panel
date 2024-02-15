import { useState } from 'react';
import routes from './routes/Routes';
import { useAuth } from './context/AuthContext';
import { UserRolesEnum } from './enums/UserRolesEnum';

import Navbar from './components/nav/Navbar';
import Sidebar from './components/nav/Sidebar';

import './assets/styles/App.css';

function App() {
    const { userRole, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const [navbarForcedIconToggle, setNavbarForcedIconToggle] = useState(true);

    const hasToken = sessionStorage.getItem('bearer');

    if (!hasToken) {
        logout();
    }

    const isUserAuthenticated = userRole && userRole !== UserRolesEnum.GUEST;

    const handleToggle = () => {
        setNavbarForcedIconToggle(false);
        setIsOpen(!isOpen);
    };

    const handleSidbarItemClick = () => {
        setNavbarForcedIconToggle(true);
        setIsOpen(!isOpen);
    };

    const sidebarOpenedClass = 'w-full h-1/2 lg:w-72';
    const sidebarClosedClass = 'hidden h-full w-72 lg:block';

    const responsiveSidebarToggledClass = isOpen ? sidebarOpenedClass : sidebarClosedClass;

    return (
        <main className="flex flex-col justify-between overflow-hidden h-screen ">
            {isUserAuthenticated && (
                <Navbar
                    onForcedIconToggle={navbarForcedIconToggle}
                    onToggle={handleToggle}
                />
            )}

            <div className="flex flex-col-reverse lg:flex-row transition-all w-full h-full bg-sc-gray ">
                <div className="overflow-auto scroll-smooth w-full h-full p-8">{routes}</div>

                {isUserAuthenticated && (
                    <div className={responsiveSidebarToggledClass}>
                        <Sidebar onClick={handleSidbarItemClick} />
                    </div>
                )}
            </div>
        </main>
    );
}

export default App;
