import { ReactNode } from 'react';
import SimpleDrawerUnit from '../../../pages/Units/Components/Units/DrawerUnits/SimpleDrawerUnit';
import HiddenHandleDrawerUnit from '../../../pages/Units/Components/Units/DrawerUnits/HiddenHandleDrawerUnit';

interface UnitProps {
    name: string;
    index: number;
    img: string;
    component: ReactNode;
}
const DrawerUnits = ({ projectID, catTitle, onSelection }: { projectID: string; catTitle: string; onSelection: (unit: ReactNode, title: string) => void }) => {
    const titleBase = 'کشو';
    const gUnits: UnitProps[] = [
        {
            name: 'ساده',
            index: 1,
            component: (
                <SimpleDrawerUnit
                    projectId={projectID}
                    title={`${titleBase} ساده`}
                />
            ),
            img: 'SimpleGroundUnit.png',
        },
        {
            name: 'با دستگیره مخفی',
            index: 1,
            component: (
                <HiddenHandleDrawerUnit
                    projectId={projectID}
                    title={`${titleBase} با دستگیره مخفی`}
                />
            ),
            img: 'SimpleGroundUnit.png',
        },
    ];

    const onUnitSelect = (unit: ReactNode, title: string) => {
        onSelection(unit, title);
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center  w-full md:w-96 p-2 r2l">
            {gUnits.map((u) => (
                <button
                    key={u.index}
                    onClick={() => {
                        onUnitSelect(u.component, u.name);
                    }}
                    className="flex items-center justify-between px-4 py-3 bg-sc-purple-normal hover:bg-sc-gray rounded-lg w-full">
                    <p className="text-sm sm:text-base"> {`${catTitle} ${u.name}`}</p>
                    <img
                        src={`https://cdn.sitechoob.ir/public/units/${u.img}`}
                        className="w-16 sm:w-20 md:w-24"
                        loading="lazy"
                    />
                </button>
            ))}
        </div>
    );
};

export default DrawerUnits;
