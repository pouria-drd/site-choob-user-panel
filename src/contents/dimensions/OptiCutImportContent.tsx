import { useState } from 'react';

import { useToast } from '../../components/uiComp/toasts/ToastProvider';
import AlertIcon from '../../components/icons/AlertIcon';
import Button from '../../components/uiComp/buttons/Button';
import DimensionService from '../../services/DimensionService';
import { StatusEnum } from '../../enums/StatusEnum';

const OptiCutImportContent = ({ dimensionId, onSuccess }: { dimensionId: string; onSuccess: () => void }) => {
    const { showToast } = useToast();
    const dimensionService = new DimensionService();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            console.log('No file selected!');
            return;
        }

        let csvFile = new FormData();
        csvFile.append('csvFile', selectedFile);

        try {
            const result = await dimensionService.UploadOptiCutFile<any>(dimensionId, csvFile);

            if (!result.status) {
                showToast(result.message, StatusEnum.Error, 'خطا در انجام عملیات');
            } else {
                showToast(result.message, StatusEnum.Success, 'عملیات موفقیت آمیز بود');
                onSuccess();
            }
        } catch (e) {
            const exp = e as any;
            showToast(exp.response.data.message, StatusEnum.Error, 'خطا در انجام عملیات');
        }
    };

    return (
        <div className="flex flex-col gap-4  p-2 w-full md:w-[600px] r2l">
            <p>علامت های لبه قابل تشخیص:</p>
            <div className="flex justify-between sm:justify-center flex-wrap gap-3 text-base font-peydaMedium p-2 border rounded-lg">
                <div className="flex justify-between sm:justify-center flex-wrap gap-3 text-base font-peydaMedium p-2">
                    <div className="flex flex-wrap gap-1 text-base font-peydaMedium">
                        <p>پی وی سی:</p>
                        <p>N</p>
                    </div>
                    <div className="flex flex-wrap gap-1 text-base font-peydaMedium">
                        <p>شیار:</p>
                        <p>SH</p>
                    </div>
                    <div className="flex flex-wrap gap-1 text-base font-peydaMedium">
                        <p>پی وی سی و شیار:</p>
                        <p>NS</p>
                    </div>
                    <div className="flex flex-wrap gap-1 text-base font-peydaMedium">
                        <p>گازور:</p>
                        <p>G</p>
                    </div>
                    <div className="flex flex-wrap gap-1 text-base font-peydaMedium">
                        <p>شیار و گازور:</p>
                        <p>NG</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-1 items-center text-sc-brown-600 w-fit text-sc-blue-normal">
                    <AlertIcon />
                    <h3 className="font-peydaMedium ">ابعاد به میلی متر </h3>
                </div>
            </div>
            <div className="flex flex-col r2l border-2 border-spacing-2 rounded-lg border-dotted p-2 border-sc-gray-600">
                <input
                    type="file"
                    name="file"
                    id="csvFile"
                    className="hidden-input"
                    accept=".txt,.csv"
                    maxLength={1}
                    onChange={handleFileChange}
                />

                <div>فایل را انتخاب یا اینجا رها کنید</div>
            </div>
            <Button
                text="بارگذاری"
                onClick={handleSubmit}
            />{' '}
        </div>
    );
};

export default OptiCutImportContent;
