import Calculator from '../../assets/images/calculator.png';

const DimensionIsCalculating = () => {
    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col gap-2 bg-white rounded-lg p-8 justify-center items-center font-peyda">
                <div className="relative">
                    <div className="flex justify-center items-center h-16 w-16 sm:h-24 sm:w-24 rounded-full text-sc-blue-normal ">
                        <img
                            src={Calculator}
                            className="h-8 w-6 sm:h-12 sm:w-10 transition-all"
                        />
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                        <div className="rounded-full border-2 sm:border-4 border-sc-purple-normal border-t-2 sm:border-t-4 border-t-sc-blue-normal h-16 w-16 sm:h-24 sm:w-24 animate-spin-slow duration-300"></div>
                    </div>
                </div>

                <p className="text-sc-blue-normal r2l text-sm sm:text-base">لیست ابعاد در حال محاسبه می باشد</p>
            </div>
        </div>
    );
};

export default DimensionIsCalculating;
