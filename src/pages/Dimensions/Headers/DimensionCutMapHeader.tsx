
interface DimensionCutMapHeaderProps {
    headerData: DimensionDetailModel;
    onBackClicked: () => void;
}

const DimensionCutMapHeader = ({ headerData, onBackClicked }: DimensionCutMapHeaderProps) => {

    const handleOnBackClicked = () => {
        onBackClicked();
    };

    return (
        <div className="bg-white flex rounded-lg px-4 py-2">
            <div className="grid grid-cols-6 bg-white rounded-lg w-full px-4 py-6 sm:p-6 gap-y-8">
                <div className="col-span-6 sm:col-span-2 border-b sm:border-none pb-4 sm:p-0">
                    <div className="flex justify-between items-center">
                        <button className="base-button info" onClick={handleOnBackClicked}>
                            بازگشت
                        </button>
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-4 r2l">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10">
                        <p className="text-sm sm:text-base inline-block">
                            عنوان:
                            <span className="text-gray-400">{headerData?.title}</span>
                        </p>
                        {/* LIKE ABOVE>>> */}
                        {/* TODO: component these:>>> */}

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>رنگ PVC:</p>
                            <p className="text-gray-400">{headerData?.pvcColor}</p>
                        </div>

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>ابعاد ورق:</p>
                            <p className="text-gray-400">{headerData?.woodSheetDimensions}</p>
                        </div>

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>نوع برش:</p>
                            <p className="text-gray-400">{headerData?.isNotRotatable ? 'از راه چوب' : 'آزاد'}</p>
                        </div>

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>قطر تیغه برش:</p>
                            <p className="text-gray-400">4.5mm</p>
                        </div>

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>تریم از هر طرف:</p>
                            <p className="text-gray-400">5mm</p>
                        </div>

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>تعداد ورق:</p>
                            <p className="text-gray-400">{headerData?.woodSheetCount}</p>
                        </div>
                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>توضیحات:</p>
                            <p className="text-gray-400">{headerData?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DimensionCutMapHeader;
