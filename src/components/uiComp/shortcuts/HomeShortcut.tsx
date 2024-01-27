import { ReactNode } from 'react';

interface HomeShortcutProps {
    label: string;
    children: ReactNode;
}

const HomeShortcut = ({ label, children }: HomeShortcutProps) => {
    return (
        <div className="flex flex-col justify-end w-full gap-4 pt-4">
            <h2 className="font-bold text-lg sm:text-xl text-right text-sc-blue-normal">{label}</h2>
            <div className="flex flex-col sm:flex-row-reverse flex-wrap justify-end sm:justify-start gap-4">{children}</div>
        </div>
    );
};

export default HomeShortcut;
