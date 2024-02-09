import { useState } from 'react';
import CutPlane from '../dimensions/CutPlane';

const CutPartEdit = ({ cutPart, onEdit }: { cutPart: DimensionCutModel; onEdit: (editedData: DimensionCutModel) => void }) => {
    const [formData, setFormData] = useState<DimensionCutModel>(cutPart);

    const handleXChange = (value: string | number | undefined) => {
        if (!value) return;

        setFormData((prevData) => {
            return {
                ...prevData,
                x: Number(value),
            };
        });
    };

    const handleYChange = (value: string | number | undefined) => {
        if (!value) return;

        setFormData((prevData) => {
            return {
                ...prevData,
                y: Number(value),
            };
        });
    };

    const handleCountChange = (value: string | number | undefined) => {
        if (!value) return;

        setFormData((prevData) => {
            return {
                ...prevData,
                count: Number(value),
            };
        });
    };

    const handleOnEdit = () => {
        onEdit(formData);
    };

    return (
        <div className="flex flex-col gap-4 justify-center w-full md:w-80 r2l">
            <div className="flex flex-col md:flex-row   items-center justify-between">
                <div className="flex flex-col flex-wrap justify-between md:flex-row gap-1 w-full  r2l">
                    <div className="flex flex-col">
                        <label>طول</label>
                        <input
                            id="xInput"
                            className="base-input w-full"
                            placeholder="طول(سانتی متر)"
                            type="number"
                            min={0}
                            value={formData.x == 0 ? '' : formData.x}
                            onChange={(e) => handleXChange(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label>عرض</label>
                        <input
                            className="base-input  w-full"
                            placeholder="عرض(سانتی متر)"
                            type="number"
                            min={0}
                            value={formData.y == 0 ? '' : formData.y}
                            onChange={(e) => handleYChange(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label>تعداد</label>
                        <input
                            className="base-input  w-full"
                            placeholder="تعداد"
                            type="number"
                            value={formData.count == 0 ? '' : formData.count}
                            onChange={(e) => handleCountChange(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full mt-2 flex items-center justify-center">
                    <CutPlane dimension={formData} />
                </div>
            </div>

            <div className="flex items-center justify-end mt-4">
                <button
                    onClick={handleOnEdit}
                    className="base-button outlined-info w-full md:w-fit">
                    ذخیره
                </button>
            </div>
        </div>
    );
};

export default CutPartEdit;
