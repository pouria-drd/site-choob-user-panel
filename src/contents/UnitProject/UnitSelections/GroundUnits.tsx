import { ReactNode } from 'react';
import SimpleGroundUnit from '../../../pages/Units/Components/Units/GroundUnits/SimpleGroundUnit';
import FixedGroundUnit from '../../../pages/Units/Components/Units/GroundUnits/FixedGroundUnit';
import SimpleGroundUnitWithPillar from '../../../pages/Units/Components/Units/GroundUnits/SimpleGroundUnitWithPillar';
import FixedGroundUnitWithPillar from '../../../pages/Units/Components/Units/GroundUnits/FixedGroundUnitWithPillar';
import SimpleOpenUnit from '../../../pages/Units/Components/Units/GroundUnits/SimpleOpenUnit';
import FixedOpenUnit from '../../../pages/Units/Components/Units/GroundUnits/FixedOpenUnit';

interface UnitProps {
    name: string;
    index: number;
    img: string;
    component: ReactNode;
}
const GroundUnits = ({ projectID, catTitle, onSelection }: { projectID: string; catTitle: string; onSelection: (unit: ReactNode) => void }) => {
    const titleBase = 'زمینی';
    const gUnits: UnitProps[] = [
        {
            name: 'ساده',
            index: 1,
            component: (
                <SimpleGroundUnit
                    projectId={projectID}
                    title={`${titleBase} ساده`}
                />
            ),
            img: 'SimpleGroundUnit.png',
        },
        {
            name: 'ثابت دار',
            index: 2,
            component: (
                <FixedGroundUnit
                    projectId={projectID}
                    title={`${titleBase} ثابت دار`}
                />
            ),
            img: 'FixedGroundUnit.png',
        },
        {
            name: 'ساده کنار ستون',
            index: 3,
            component: (
                <SimpleGroundUnitWithPillar
                    projectId={projectID}
                    title={`${titleBase} ساده کنار ستون`}
                />
            ),
            img: 'SimpleGroundUnitWithPillar.png',
        },
        {
            name: 'ثابت دار کنار ستون',
            index: 4,
            component: (
                <FixedGroundUnitWithPillar
                    projectId={projectID}
                    title={`${titleBase} ثابت دار کنار ستون`}
                />
            ),
            img: 'FixedGroundUnitWithPillar.png',
        },
        {
            name: 'اپن',
            index: 5,
            component: (
                <SimpleOpenUnit
                    projectId={projectID}
                    title={`${titleBase} اپن`}
                />
            ),
            img: 'SimpleGroundUnit.png',
        },
        {
            name: 'اپن ثابت دار',
            index: 6,
            component: (
                <FixedOpenUnit
                    projectId={projectID}
                    title={`${titleBase} اپن ثابت دار`}
                />
            ),
            img: 'SimpleGroundUnit.png',
        },
    ];

    const onUnitSelect = (unit: ReactNode) => {
        onSelection(unit);
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center  w-full md:w-96 p-2 r2l">
            {gUnits.map((u) => (
                <button
                    key={u.index}
                    onClick={() => {
                        onUnitSelect(u.component);
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

export default GroundUnits;
