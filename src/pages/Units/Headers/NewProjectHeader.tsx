import { useNavigate } from 'react-router-dom';
import Button from '../../../components/uiComp/buttons/Button';
import UnitProjectService from '../../../services/UnitProjectService';
import { useState } from 'react';
import { useToast } from '../../../components/uiComp/toasts/ToastProvider';
import { StatusEnum } from '../../../enums/StatusEnum';

function NewProjectHeader() {
    const unitProjectService = new UnitProjectService();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [isSendingRequest, setIsSendingRequest] = useState(false);

    const [dto, setDTO] = useState<NewUnitProjectDTO>({ title: '', description: '' });

    const handleInputChange = (fieldName: string, value: string) => {
        setDTO((prevDTO) => ({
            ...prevDTO,
            [fieldName]: value,
        }));
    };

    const onSaveDone = async () => {
        setIsSendingRequest(true);

        try {
            const result = await unitProjectService.CreateNewUnitProject<any>(dto);

            if (result.status) {
                showToast(result.message, StatusEnum.Success, 'عملیات موفقیت آمیز بود');
                navigate('/unit-project/' + result.data);
            } else {
                showToast(result.message, StatusEnum.Error, 'عملیات موفقیت آمیز بود');
                setIsSendingRequest(false);
            }
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <div className="flex flex-col gap-3">
                <h2 className="text-lg md:text-xl text-right font-semibold">پروژه جدید</h2>
                <div className="flex flex-col  bg-white rounded-lg py-6 px-8 gap-5 r2l">
                    <div className="flex flex-col sm:flex-row gap-2 items-center ">
                        <div className="flex flex-col gap-2 w-full">
                            <label>عنوان پروژه</label>
                            <input
                                type="text"
                                placeholder="عنوان پروژه خود را وارد کنید"
                                maxLength={32}
                                className="base-input"
                                value={dto.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>توضیحات (اختیاری)</label>
                            <input
                                type="text"
                                maxLength={100}
                                placeholder="توضیحات پروژه خود را وارد کنید"
                                className="base-input"
                                value={dto.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex w-full md:w-auto justify-end">
                        <Button
                            text="ذخیره"
                            onClick={onSaveDone}
                            isBusy={isSendingRequest}
                            isDisabled={dto.title.length <= 0}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewProjectHeader;
