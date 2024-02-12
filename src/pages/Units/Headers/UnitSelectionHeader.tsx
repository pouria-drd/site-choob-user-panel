import { ReactNode, useState } from 'react';
import Modal from '../../../components/uiComp/modals/Modal';
import GroundUnits from '../../../contents/UnitProject/UnitSelections/GroundUnits';
import WallUnits from '../../../contents/UnitProject/UnitSelections/WallUnits';
import Cube2Icon from '../../../components/icons/Cube2Icon';
import YakhchalUnits from '../../../contents/UnitProject/UnitSelections/YakhchalUnits';
import DrawerUnits from '../../../contents/UnitProject/UnitSelections/DrawerUnits';
interface unitCatProps {
    name: string;
    index: number;
}
function UnitSelectionHeader({ projectID, onSelectionChanged }: { projectID: string; onSelectionChanged: (component: ReactNode) => void }) {
    const [isUnitCatModalOpen, setIsUnitCatModalOpen] = useState(false);
    const openUnitCatModal = () => setIsUnitCatModalOpen(true);
    const closeUnitCatModal = () => setIsUnitCatModalOpen(false);

    const [selectedUnitCat, setSelectedUnitCat] = useState<ReactNode>();
    const [selectedUnitCatTitle, setSelectedUnitCatTitle] = useState<ReactNode>('زمینی');

    const unitCats: unitCatProps[] = [
        { name: 'زمینی', index: 1 },
        { name: 'دیواری', index: 2 },
        { name: 'یخچال', index: 3 },
        { name: 'کشو', index: 4 },
    ];

    const onSelection = (unitCat: unitCatProps) => {
        setSelectedUnitCatTitle(unitCat.name);
        switch (unitCat.index) {
            case 1:
                setSelectedUnitCat(
                    <GroundUnits
                        projectID={projectID}
                        catTitle={unitCat.name}
                        onSelection={onUnitSelect}
                    />
                );
                break;
            case 2:
                setSelectedUnitCat(
                    <WallUnits
                        projectID={projectID}
                        catTitle={unitCat.name}
                        onSelection={onUnitSelect}
                    />
                );
                break;
            case 3:
                setSelectedUnitCat(
                    <YakhchalUnits
                        projectID={projectID}
                        catTitle={unitCat.name}
                        onSelection={onUnitSelect}
                    />
                );
                break;
            case 4:
                setSelectedUnitCat(
                    <DrawerUnits
                        projectID={projectID}
                        catTitle={unitCat.name}
                        onSelection={onUnitSelect}
                    />
                );
                break;
        }

        openUnitCatModal();
    };

    const onUnitSelect = (unit: ReactNode) => {
        closeUnitCatModal();
        onSelectionChanged(unit);
    };

    return (
        <>
            <div className="flex flex-wrap  gap-2 p-2  r2l w-full h-full border-b pb-4">
                {unitCats.map((u) => (
                    <button
                        onClick={() => onSelection(u)}
                        key={u.index}
                        className="flex items-center gap-1 rounded-md bg-sc-brown-500 text-sc-brown-800 px-4 py-2 hover:shadow-inner  hover:text-gray-800 hover:scale-105 transition-all">
                        <Cube2Icon className="w-4" />
                        {u.name}
                    </button>
                ))}
            </div>

            <Modal
                title={`یونیت های ${selectedUnitCatTitle}`}
                isOpen={isUnitCatModalOpen}
                onClose={closeUnitCatModal}>
                {selectedUnitCat}
            </Modal>
        </>
    );
}

export default UnitSelectionHeader;
