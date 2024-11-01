import { ReactNode } from 'react';

import SimpleWallUnit from '../../../pages/Units/Components/Units/WallUnits/SimpleWallUnit';
import SimpleWallUnitWithPillar from '../../../pages/Units/Components/Units/WallUnits/SimpleWallUnitWithPillar';
import FixedWallUnitWithPillar from '../../../pages/Units/Components/Units/WallUnits/FixedWallUnitWithPillar';
import WallCoverUnit from '../../../pages/Units/Components/Units/WallUnits/WallCoverUnit';
import WallAbchekanUnit from '../../../pages/Units/Components/Units/WallUnits/WallAbchekanUnit';
import FixedWallUnit from '../../../pages/Units/Components/Units/WallUnits/FixedWallUnit';
import WallHoodUnit from '../../../pages/Units/Components/Units/WallUnits/WallHoodUnit';
import WallHiddenHandleUnit from '../../../pages/Units/Components/Units/WallUnits/WallHiddenHandleUnit';
import WallTwoPartUnit from '../../../pages/Units/Components/Units/WallUnits/WallTwoPartUnit';

interface UnitProps {
    name: string;
    index: number;
    img: string;
    component: ReactNode;
}
const GroundUnits = ({ projectID, catTitle, onSelection }: { projectID: string; catTitle: string; onSelection: (unit: ReactNode, title: string) => void }) => {
    const titleBase = 'دیواری';
    const gUnits: UnitProps[] = [
        {
            name: 'ساده',
            index: 1,
            component: (
                <SimpleWallUnit
                    projectId={projectID}
                    title={`${titleBase} ساده`}
                />
            ),
            img: 'SimpleWallUnit.png',
        },
        {
            name: 'ثابت دار',
            index: 2,
            component: (
                <FixedWallUnit
                    projectId={projectID}
                    title={`${titleBase} ثابت دار`}
                />
            ),
            img: 'FixedWallUnit.png',
        },
        {
            name: 'ساده کنار ستون',
            index: 3,
            component: (
                <SimpleWallUnitWithPillar
                    projectId={projectID}
                    title={`${titleBase} ساده کنار ستون`}
                />
            ),
            img: 'SimpleWallUnitWithPillar.png',
        },
        {
            name: 'ثابت دار کنار ستون',
            index: 4,
            component: (
                <FixedWallUnitWithPillar
                    projectId={projectID}
                    title={`${titleBase} ثابت دار کنار ستون`}
                />
            ),
            img: 'FixedWallUnitWithPillar.png',
        },
        {
            name: 'کاور پکیج',
            index: 5,
            component: (
                <WallCoverUnit
                    projectId={projectID}
                    title={`${titleBase} کاور پکیج`}
                />
            ),
            img: 'WallCoverUnit.png',
        },
        {
            name: 'آبچکان',
            index: 6,
            component: (
                <WallAbchekanUnit
                    projectId={projectID}
                    title={`${titleBase} آبچکان`}
                />
            ),
            img: 'WallAbchekan.png',
        },
        {
            name: 'هود ساده',
            index: 7,
            component: (
                <WallHoodUnit
                    projectId={projectID}
                    title={`${titleBase} هود ساده`}
                />
            ),
            img: 'WallHood.png',
        },
        {
            name: 'با دستگیره مخفی',
            index: 8,
            component: (
                <WallHiddenHandleUnit
                    projectId={projectID}
                    title={`${titleBase} با دستگیره مخفی`}
                />
            ),
            img: 'WallHiddenHandle.png',
        },

        {
            name: 'پله ای',
            index: 9,
            component: (
                <WallTwoPartUnit
                    projectId={projectID}
                    title={`${titleBase} پله ای`}
                />
            ),
            img: 'WallTwoPartUnit.png',
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

export default GroundUnits;
