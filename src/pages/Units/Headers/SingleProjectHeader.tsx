import Button from '../../../components/uiComp/buttons/Button';
import { useEffect, useState } from 'react';
import { ButtonTypes } from '../../../enums/ButtonTypes';
import Cube2Icon from '../../../components/icons/Cube2Icon';
import { useNavigate } from 'react-router-dom';
import CalculatorIcon from '../../../components/icons/CalculatorIcon';
import Modal from '../../../components/uiComp/modals/Modal';
import CalculateProjectModalContent from '../../../contents/UnitProject/CalculateProjectModalContent';
import MapIcon from '../../../components/icons/MapIcon';
import EditIcon from '../../../components/icons/EditIcon';
import StatusChip from '../../../components/uiComp/chips/StatusChip';
import { StatusEnum } from '../../../enums/StatusEnum';

function SingleProjectHeader({ project, onCalculateClicked }: { project: UnitProjectModel; onCalculateClicked: (dto: CalculateUnitProjectDTO) => void }) {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {}, [project]);

    const goToNewUnitPage = () => {
        navigate('/unit-project/add-unit/' + project.id);
    };

    return (
        <>
            <div className="flex flex-col gap-3 font-peyda">
                <div className="flex flex-col md:flex-row justify-between  md:items-center">
                    <div className="flex justify-between items-center gap-2">
                        <Button
                            Type={ButtonTypes.Info}
                            text={
                                <div className="flex items-center">
                                    یونیت جدید
                                    <Cube2Icon />
                                </div>
                            }
                            onClick={goToNewUnitPage}
                        />
                    </div>
                    <h2 className="text-lg md:text-xl text-right font-semibold">مدیریت پروژه</h2>
                </div>
            </div>

            <div className="grid grid-cols-6 bg-white rounded-lg w-full px-4 py-6 sm:p-6 gap-y-8">
                <div className="col-span-6 md:col-span-2 border-b md:border-none pb-4 md:p-0">
                    <div className="flex justify-between items-center">
                        {project.isCalculated ? (
                            <button
                                onClick={() => {}}
                                className="base-button success-reverse gap-1 md:hidden ">
                                لیست برش
                                <MapIcon size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={openModal}
                                className="base-button success-reverse gap-1 md:hidden ">
                                محاسبه
                                <CalculatorIcon size={18} />
                            </button>
                        )}
                        <div className="flex gap-4 items-center ">
                            <button
                                onClick={() => {}}
                                className="hover:text-blue-700 text-sc-blue-normal">
                                <EditIcon />
                            </button>
                            {project.isCalculated ? (
                                <StatusChip
                                    type={StatusEnum.Success}
                                    text="محاسبه شده"
                                />
                            ) : (
                                <StatusChip
                                    type={StatusEnum.Info}
                                    text="درحال ویرایش"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-6 md:col-span-4 r2l">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10">
                        <p className="text-sm sm:text-sm md:text-base inline-block">
                            عنوان پروژه:
                            <span className="text-gray-400">{project.title}</span>
                        </p>

                        <p className="text-sm sm:text-base md:text-base inline-block">
                            توضیحات:
                            <span className="text-gray-400">{!project.description ? '---' : project.description}</span>
                        </p>
                    </div>
                </div>

                <div className="col-span-6 hidden md:block">
                    {project.isCalculated ? (
                        <button
                            onClick={() => {}}
                            className="base-button success-reverse gap-1">
                            لیست برش
                            <MapIcon size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={openModal}
                            className="base-button outlined-success gap-1 ">
                            محاسبه
                            <CalculatorIcon size={18} />
                        </button>
                    )}
                </div>
            </div>

            <Modal
                title="محاسبه پروژه"
                isOpen={isModalOpen}
                onClose={closeModal}>
                <CalculateProjectModalContent
                    project={project}
                    onCalculateClicked={(dto) => onCalculateClicked(dto)}
                />
            </Modal>
        </>
    );
}

export default SingleProjectHeader;
