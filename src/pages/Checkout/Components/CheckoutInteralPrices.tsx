import { useEffect, useState } from 'react';

function CheckoutInteralPrices({ checkoutData }: { checkoutData: CheckoutModel }) {
    const formatPrice = (price: number) => {
        const formater = new Intl.NumberFormat('fa-Ir');
        return `${formater.format(price)} تومان`;
    };

    useEffect(() => {}, [checkoutData]);

    return (
        <div className="flex flex-col">
            <div className="flex border justify-between items-center border-gray-400 px-2 py-3 bg-sc-purple-normal">
                <h4 className="sm:text-lg ">جمع کل: {formatPrice(checkoutData.internalShipmentPrice)}</h4>
                <h4 className="sm:text-lg">باربری داخلی {checkoutData.zoneName}</h4>
            </div>
            <div className="flex border flex-wrap bg-sc-gray gap-4 border-gray-400 border-t-0 p-4 r2l">
                <div className="flex gap-1 items-center r2l">
                    <span className="text-sc-gray-normal">تعداد کل:</span>
                    <span className="font-yekanX ss02">{checkoutData.totalItems}</span>
                </div>
                <div className="flex gap-1 items-center r2l">
                    <span className="text-sc-gray-normal">هزینه بارگیری:</span>
                    <span className="font-yekanX ss02">{formatPrice(checkoutData.cargoLoadPrice)}</span>
                </div>
                <div className="flex gap-1 items-center r2l">
                    <span className="text-sc-gray-normal">هزینه باربری داخلی:</span>
                    <span className="font-yekanX ss02 ">{`${formatPrice(checkoutData.internalShipmentFee)} (از ${checkoutData.totalZoneWarehouses} انبار)`}</span>
                </div>
                <div className="flex gap-1 items-center r2l">
                    <span className="text-sc-gray-normal">خودرو:</span>
                    <span className="font-yekanX ss02">{checkoutData.internalVehicleName}</span>
                </div>
                <div className="flex gap-1 items-center r2l">
                    <span className="text-sc-gray-normal">هزینه کل باربری داخلی:</span>
                    <span className="font-yekanX ss02">{formatPrice(checkoutData.internalShipmentPrice)}</span>
                </div>
            </div>
        </div>
    );
}

export default CheckoutInteralPrices;
