import { useEffect, useState } from 'react';
import AlertIcon from '../../../components/icons/AlertIcon';

function CheckoutInteralPrices({ checkoutData }: { checkoutData: CheckoutModel }) {
    const formatPrice = (price: number) => {
        const formater = new Intl.NumberFormat('fa-Ir');
        return `${formater.format(price)} تومان`;
    };

    useEffect(() => {}, [checkoutData]);

    return (
        <div className="flex flex-col">
            <div className="flex border justify-between items-center border-gray-400 px-2 py-3 bg-sc-purple-normal">
                <h4 className="text-sm sm:text-base ">جمع کل: {formatPrice(checkoutData.internalShipmentPrice)}</h4>
                <h4 className="text-sm sm:text-base r2l">باربری داخلی {checkoutData.zoneName}</h4>
            </div>
            <div className="flex flex-col md:flex-row text-sm sm:text-base  flex-wrap  bg-sc-gray gap-4 border border-gray-400 border-t-0  p-2 py-6 sm:px-4 r2l">
                <div className="flex gap-1 items-center r2l">
                    <span className="text-sc-gray-normal whitespace-nowrap">تعداد کل:</span>
                    <span className="font-yekanX ss02">{checkoutData.totalItems}</span>
                </div>
                <div className="flex gap-1 items-center r2l">
                    <span className="text-sc-gray-normal whitespace-nowrap">هزینه بارگیری:</span>
                    <span className="font-yekanX ss02">{formatPrice(checkoutData.cargoLoadPrice)}</span>
                </div>
                <div className="flex gap-1 items-center r2l">
                    <span className="text-sc-gray-normal whitespace-nowrap">هزینه باربری:</span>
                    <p className="font-yekanX ss02 ">{`${formatPrice(checkoutData.internalShipmentFee)} (از ${checkoutData.totalZoneWarehouses} انبار)`}</p>
                </div>
                <div className="flex gap-1 items-center r2l">
                    <span className="text-sc-gray-normal whitespace-nowrap">خودرو:</span>
                    <span className="font-yekanX ss02">{checkoutData.internalVehicleName}</span>
                </div>
                <div className="flex gap-1 items-center r2l">
                    <span className="text-sc-gray-normal whitespace-nowrap">هزینه کل باربری داخلی:</span>
                    <span className="font-yekanX ss02">{formatPrice(checkoutData.internalShipmentPrice)}</span>
                </div>
            </div>

            <div className="flex justify-center sm:justify-start items-center bg-sc-purple-normal text-sc-blue-normal border border-gray-400 border-t-0 gap-1  px-2 py-3 r2l">
                <AlertIcon size={16} />
                <p className="text-xs sm:text-base font-bold sm:font-normal">فاکتور برش بعد از اتمام فرآیند آن، پرداخت خواهد شد.</p>
            </div>
        </div>
    );
}

export default CheckoutInteralPrices;
