import HomeIcon from '../icons/HomeIcon';
import SidebarItem from './SidebarItem';
import CalculatorIcon from '../icons/CalculatorIcon';
import CreditCardIcon from '../icons/CreditCardIcon';
import CubeIcon from '../icons/CubeIcon';
//import { useEffect, useState } from 'react';

function Sidebar({ onClick }: { onClick?: () => void }) {
    //const [isInDev, setIsInDev] = useState(false);
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

    /* useEffect(() => {
        const env = import.meta.env;

        if (env.MODE === 'development') {
            setIsInDev(true);
        }
    }, []);*/
    return (
        <div className="flex flex-col bg-sc-purple-normal w-full h-full p-4 gap-4">
            <SidebarItem
                label="خانه"
                icon={<HomeIcon />}
                onClick={onClick}
            />
            <SidebarItem
                label="محاسبات"
                icon={<CalculatorIcon />}
                items={calculationlinks}
                onClick={onClick}
            />

            <SidebarItem
                label="یونیت"
                icon={<CubeIcon />}
                items={unitLinks}
                onClick={onClick}
            />

            <SidebarItem
                label="مالی"
                icon={<CreditCardIcon />}
                items={paymentlinks}
                onClick={onClick}
            />
        </div>
    );
}

export default Sidebar;
