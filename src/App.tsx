import { useEffect, useState } from 'react';
import routes from './routes/Routes';
import { useAuth } from './context/AuthContext';
import { UserRolesEnum } from './enums/UserRolesEnum';

import Navbar from './components/nav/Navbar';
import Sidebar from './components/nav/Sidebar';

import './assets/styles/App.css';

function App() {
    const { userRole, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const [navbarForcedIconToggle, setNavbarForcedIconToggle] = useState(false);

    const sidebarOpenedClass = 'w-full h-1/2 md:h-full lg:w-72';
    const sidebarClosedClass = 'hidden h-full w-72 lg:block';
    const [responsiveSidebarToggledClass, setResponsiveSidebarToggledClass] = useState(sidebarClosedClass);

    const hasToken = sessionStorage.getItem('bearer');

    if (!hasToken) {
        logout();
    }

    const isUserAuthenticated = userRole && userRole !== UserRolesEnum.GUEST;

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSidarItemClick = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        setNavbarForcedIconToggle(isOpen);
        setResponsiveSidebarToggledClass(isOpen ? sidebarOpenedClass : sidebarClosedClass);
    }, [isOpen]);

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
                        <Sidebar onClick={handleSidarItemClick} />
                    </div>
                )}
            </div>
        </main>
    );
}

export default App;
