import { useEffect } from 'react';

function UnitSelectionHeader({ units, onSelectionChanged }: { units: UnitPropsDTO[]; onSelectionChanged: (unit: UnitPropsDTO) => void }) {
    useEffect(() => {}, [units]);

    const onSelection = (unit: UnitPropsDTO) => {
        onSelectionChanged(unit);
    };
    return (
        <>
            <div className="flex gap-2 p-2 bg-sc-purple-normal rounded-lg overflow-x-auto r2l">
                {units.map((u, index) => (
                    <div
                        key={index}
                        className="relative flex  flex-shrink-0">
                        <div className="absolute flex justify-center items-end h-1/3 pb-2 w-full bg-gradient-to-t from-gray-500  bottom-0 rounded-b-lg">
                            <button
                                onClick={() => onSelection(u)}
                                className="w-full text-center hover:text-white">
                                انتخاب
                            </button>
                        </div>

                        <img
                            src={u.image}
                            alt={u.name}
                            className="h-24 sm:h-28 md:h-36 w-24 sm:w-28 md:w-36 rounded-lg bg-sc-purple-400"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default UnitSelectionHeader;
