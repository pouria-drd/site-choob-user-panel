import Button from '../../../components/uiComp/buttons/Button';
import { useEffect, useState } from 'react';
import { ButtonTypes } from '../../../enums/ButtonTypes';
import Cube2Icon from '../../../components/icons/Cube2Icon';
import { useNavigate } from 'react-router-dom';
import CalculatorIcon from '../../../components/icons/CalculatorIcon';
import Modal from '../../../components/uiComp/modals/Modal';
import CalculateProjectModalContent from '../../../contents/UnitProject/CalculateProjectModalContent';

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
                            Type={ButtonTypes.OutlinedBrown}
                            text={
                                <div className="flex items-center">
                                    یونیت جدید
                                    <Cube2Icon />
                                </div>
                            }
                            onClick={goToNewUnitPage}
                        />
                        <Button
                            Type={ButtonTypes.OulinedSuccess}
                            text={
                                <div className="flex items-center">
                                    محاسبه
                                    <CalculatorIcon />
                                </div>
                            }
                            onClick={openModal}
                        />
                    </div>
                    <h2 className="text-lg md:text-xl text-right font-semibold">مدیریت پروژه</h2>
                </div>

                <div className="flex flex-col  bg-white rounded-lg py-6 px-8 gap-5 r2l">
                    <div className="flex flex-col sm:flex-row gap-2 items-center ">
                        <div className="flex flex-col gap-2 w-full">
                            <label>عنوان پروژه</label>
                            <input
                                type="text"
                                placeholder="عنوان پروژه خود را وارد کنید"
                                maxLength={32}
                                className="base-input"
                                value={project.title}
                                readOnly={true}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>توضیحات (اختیاری)</label>
                            <input
                                type="text"
                                maxLength={100}
                                placeholder="توضیحات پروژه خود را وارد کنید"
                                className="base-input"
                                value={project.description}
                                readOnly={true}
                            />
                        </div>
                    </div>

                    <div className="flex w-full md:w-auto justify-end">
                        <Button
                            text="بروزرسانی"
                            onClick={() => {}}
                            Type={ButtonTypes.OulinedInfo}
                        />
                    </div>
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
