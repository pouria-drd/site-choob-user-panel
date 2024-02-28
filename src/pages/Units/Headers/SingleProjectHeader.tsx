import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonTypes } from '../../../enums/ButtonTypes';

import EditIcon from '../../../components/icons/EditIcon';

import Button from '../../../components/uiComp/buttons/Button';

function SingleProjectHeader({ project, onCalculateClicked }: { project: UnitProjectModel; onCalculateClicked: () => void }) {
    const navigate = useNavigate();

    useEffect(() => {}, [project]);

    const goToNewUnitPage = () => {
        navigate('/unit-project/add-unit/' + project.id);
    };

    return (
        <>
            <div className="flex flex-col gap-3 font-peyda">
                <div className="flex flex-row justify-between  md:items-center">
                    <div className="flex justify-between items-center gap-2">
                        <Button
                            Type={ButtonTypes.OulinedInfo}
                            text={<div className="flex items-center">یونیت جدید</div>}
                            onClick={goToNewUnitPage}
                        />
                    </div>
                    <h2 className="text-lg md:text-xl text-right font-semibold">مدیریت پروژه</h2>
                </div>
            </div>

            <div className="grid grid-cols-6 bg-white rounded-lg w-full px-4 py-6 sm:p-6 gap-y-8">
                <div className="flex justify-between items-center col-span-6 border-b border-sc-gray pb-5">
                    <div className="flex gap-4 items-center ">
                        <button
                            onClick={() => {}}
                            className="hover:text-blue-700 text-sc-blue-normal">
                            <EditIcon />
                        </button>
                    </div>

                    <p className="text-sm sm:text-sm md:text-base inline-block r2l">
                        عنوان پروژه:
                        <span className="text-gray-400 mr-1">{project.title}</span>
                    </p>
                </div>

                <div className="col-span-6  r2l">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                        {project.properties.map((p, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
                                <p className="inline-block">{p.title}:</p>
                                <span className="text-gray-400 mr-1">{p.valueString}</span>
                            </div>
                        ))}

                        <p className="text-sm sm:text-base md:text-base inline-block col-span-2">
                            توضیحات:
                            <span className="text-gray-400 mr-1">{!project.description ? '---' : project.description}</span>
                        </p>
                    </div>
                </div>

                <div className="col-span-6">
                    <button
                        onClick={onCalculateClicked}
                        className="base-button primary gap-1 ">
                        محاسبه
                    </button>
                </div>
            </div>
        </>
    );
}

export default SingleProjectHeader;
