import HomeIcon from '../icons/HomeIcon';

import CalculatorIcon from '../icons/CalculatorIcon';

import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CubeIcon from '../icons/CubeIcon';
import CreditCardIcon from '../icons/CreditCardIcon';
import SidebarItem from './SidebarItem';
//import { useEffect, useState } from 'react';

function Sidebar({ onClick }: { onClick?: () => void }) {
    const location = useLocation();

    const { pathname } = location;
    //const [isInDev, setIsInDev] = useState(false);

    const [sideBarItems, setSideBarItems] = useState<ReactNode[]>([]);

    const routePaths = [
        {
            name: 'home',
            items: ['/'],
        },
        {
            name: 'dimensions',
            items: ['/dimensions', '/dimensions-history'],
        },
        {
            name: 'units',
            items: ['/unit-projects', '/unit-settings'],
        },
        {
            name: 'checkout',
            items: ['/checkout'],
        },
    ];

    // options for calculation section
    const calculationlinks = [
        { label: 'لیست ابعاد فعال', to: '/dimensions' },
        { label: 'تاریخچه ابعاد', to: '/dimensions-history' },
    ];

    // options for payment section
    const paymentlinks = [{ label: 'تسویه حساب', to: '/checkout' }];

    // options for payment section
    const unitLinks = [
        { label: 'پروژه ها', to: '/unit-projects' },
        { label: 'تنظیمات', to: '/unit-settings' },
    ];

    const checkIsActive = (name: 'home' | 'dimensions' | 'units' | 'checkout') => {
        let found = false;

        routePaths
            .filter((x) => x.name === name)
            .forEach((x) => {
                if (x.items.includes(pathname)) found = true;
            });

        return found;
    };

    const generateSidebarItems = () => {
        const items = [
            <SidebarItem
                key={1}
                label="خانه"
                icon={<HomeIcon />}
                onClick={onClick}
                isActive={checkIsActive('home')}
            />,
            <SidebarItem
                key={2}
                label="محاسبات"
                icon={<CalculatorIcon />}
                items={calculationlinks}
                onClick={onClick}
                isActive={checkIsActive('dimensions')}
            />,
            <SidebarItem
                key={3}
                label="یونیت"
                icon={<CubeIcon className="w-5 h-5" />}
                items={unitLinks}
                onClick={onClick}
                isActive={checkIsActive('units')}
            />,
            <SidebarItem
                key={4}
                label="مالی"
                icon={<CreditCardIcon />}
                items={paymentlinks}
                onClick={onClick}
                isActive={checkIsActive('checkout')}
            />,
        ];

        setSideBarItems(items);
    };

    useEffect(() => {
        generateSidebarItems();
    }, [pathname]);

    return <div className="flex flex-col overflow-y-auto bg-sc-purple-normal w-full h-full rounded-md p-4">{sideBarItems}</div>;
}

export default Sidebar;
