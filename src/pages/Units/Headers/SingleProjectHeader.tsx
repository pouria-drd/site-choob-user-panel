import Button from '../../../components/uiComp/buttons/Button';
import { useEffect } from 'react';
import { ButtonTypes } from '../../../enums/ButtonTypes';
import Cube2Icon from '../../../components/icons/Cube2Icon';
import { useNavigate } from 'react-router-dom';
import CalculatorIcon from '../../../components/icons/CalculatorIcon';

function SingleProjectHeader({ project, onCalculateClicked }: { project: UnitProjectModel; onCalculateClicked: () => void }) {
    const navigate = useNavigate();

    useEffect(() => {}, [project]);

    const goToNewUnitPage = () => {
        navigate('/unit-project/add-unit/' + project.id);
    };
    const calulateClicked = () => {
        onCalculateClicked();
    };
    return (
        <>
            <div className="flex flex-col gap-3 font-peyda">
                <div className="flex justify-between items-center">
                    <Button
                        text={
                            <div className="flex items-center">
                                یونیت جدید
                                <Cube2Icon />
                            </div>
                        }
                        onClick={goToNewUnitPage}
                    />
                    <Button
                        text={
                            <div className="flex items-center">
                                محاسبه
                                <CalculatorIcon />
                            </div>
                        }
                        onClick={calulateClicked}
                    />
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
        </>
    );
}

export default SingleProjectHeader;
