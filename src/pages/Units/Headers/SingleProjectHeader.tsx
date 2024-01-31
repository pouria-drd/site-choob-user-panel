import Button from '../../../components/uiComp/buttons/Button';
import UnitProjectService from '../../../services/UnitProjectService';
import { useEffect, useState } from 'react';
import { useToast } from '../../../components/uiComp/toasts/ToastProvider';
import { StatusEnum } from '../../../enums/StatusEnum';

function SingleProjectHeader({ project }: { project: UnitProjectModel }) {
    const unitProjectService = new UnitProjectService();

    const { showToast } = useToast();

    const [isSendingRequest, setIsSendingRequest] = useState(false);

    const [projectProps, setProjectProps] = useState<UnitProjectPropsModel[]>([]);

    const handleInputChange = (fieldName: string, value: string) => {};

    const fetchProjectProps = async () => {
        try {
            const result = await unitProjectService.GetUserProperties<UnitProjectPropertiesModel>();

            if (result) {
                setProjectProps(result.properties);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchProjectProps();
    }, [project]);

    return (
        <>
            <div className="flex flex-col gap-3 font-peyda">
                <h2 className="text-lg md:text-xl text-right font-semibold">مدیریت پروژه</h2>
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
                            isBusy={isSendingRequest}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProjectHeader;
