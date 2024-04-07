import { ReactNode } from 'react';
import SimpleGroundCornerUnit from '../../../pages/Units/Components/Units/CornerUnits/SimpleGroundCornerUnit';
import GroundCornerUnitWithPillar from '../../../pages/Units/Components/Units/CornerUnits/GroundCornerUnitWithPillar';
import WallCornerUnitWithPillar from '../../../pages/Units/Components/Units/CornerUnits/WallCornerUnitWithPillar';
import SimpleWallCornerUnit from '../../../pages/Units/Components/Units/CornerUnits/SimpleWallCornerUnit';

interface UnitProps {
    name: string;
    index: number;
    img: string;
    component: ReactNode;
}
const CornerUnits = ({ projectID, catTitle, onSelection }: { projectID: string; catTitle: string; onSelection: (unit: ReactNode, title: string) => void }) => {
    const titleBase = 'کنج';
    const gUnits: UnitProps[] = [
        {
            name: 'زمینی ساده',
            index: 1,
            component: (
                <SimpleGroundCornerUnit
                    projectId={projectID}
                    title={`${titleBase} زمینی ساده`}
                />
            ),
            img: 'SimpleGroundCornerUnit.png',
        },
        {
            name: 'زمینی کنار ستون',
            index: 2,
            component: (
                <GroundCornerUnitWithPillar
                    projectId={projectID}
                    title={`${titleBase} زمینی کنار ستون`}
                />
            ),
            img: 'GroundCornerUnitWithPillar.png',
        },
        {
            name: 'دیواری ساده',
            index: 3,
            component: (
                <SimpleWallCornerUnit
                    projectId={projectID}
                    title={`${titleBase} دیواری کنار ستون`}
                />
            ),
            img: 'SimpleGroundCornerUnit.png',
        },
        {
            name: 'دیواری کنار ستون',
            index: 4,
            component: (
                <WallCornerUnitWithPillar
                    projectId={projectID}
                    title={`${titleBase} زمینی کنار ستون`}
                />
            ),
            img: 'GroundCornerUnitWithPillar.png',
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

export default CornerUnits;
