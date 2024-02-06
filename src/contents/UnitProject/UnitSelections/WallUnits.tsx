import { ReactNode } from 'react';

import SimpleWallUnit from '../../../pages/Units/Components/Units/WallUnits/SimpleWallUnit';
import SimpleWallUnitWithPillar from '../../../pages/Units/Components/Units/WallUnits/SimpleWallUnitWithPillar';
import FixedWallUnitWithPillar from '../../../pages/Units/Components/Units/WallUnits/FixedWallUnitWithPillar';
import WallCoverUnit from '../../../pages/Units/Components/Units/WallUnits/WallCoverUnit';
import WallAbchekanUnit from '../../../pages/Units/Components/Units/WallUnits/WallAbchekanUnit';
import FixedWallUnit from '../../../pages/Units/Components/Units/WallUnits/FixedWallUnit';

interface UnitProps {
    name: string;
    index: number;
    img: string;
    component: ReactNode;
}
const GroundUnits = ({ projectID, catTitle, onSelection }: { projectID: string; catTitle: string; onSelection: (unit: ReactNode, title: string) => void }) => {
    const gUnits: UnitProps[] = [
        { name: 'ساده', index: 1, component: <SimpleWallUnit projectId={projectID} />, img: 'SimpleGroundUnit.png' },
        { name: 'ثابت دار', index: 2, component: <FixedWallUnit projectId={projectID} />, img: 'FixedGroundUnit.png' },
        { name: 'ساده کنار ستون', index: 3, component: <SimpleWallUnitWithPillar projectId={projectID} />, img: 'SimpleGroundUnitWithPillar.png' },
        { name: 'ثابت دار کنار ستون', index: 4, component: <FixedWallUnitWithPillar projectId={projectID} />, img: 'FixedGroundUnitWithPillar.png' },
        { name: 'کاور پکیج', index: 5, component: <WallCoverUnit projectId={projectID} />, img: 'SimpleGroundUnit.png' },
        { name: 'آبچکان', index: 6, component: <WallAbchekanUnit projectId={projectID} />, img: 'SimpleGroundUnit.png' },
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

export default GroundUnits;
