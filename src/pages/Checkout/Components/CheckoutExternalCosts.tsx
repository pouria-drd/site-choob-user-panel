import { useEffect, useState } from 'react';
import AlertIcon from '../../../components/icons/AlertIcon';

function CheckoutExternalCosts({ externalShipmentData }: { externalShipmentData: ExternalShipmentModel }) {
    const [totalPrice, setTotalPrice] = useState('');
    const formatPrice = (price: number) => {
        const formater = new Intl.NumberFormat('fa-Ir');
        return `${formater.format(price)} تومان`;
    };

    useEffect(() => {
        let tPrice = 0;

        tPrice += externalShipmentData.externalShipmentCargoLoadPrice;
        tPrice += externalShipmentData.externalShipmentCargoReloadPrice;
        tPrice += externalShipmentData.externalShipmentPrice;
        //  tPrice += externalShipmentData.externalTotalPrice;

        setTotalPrice(formatPrice(tPrice));
    }, [externalShipmentData]);

    return (
        <div className="flex flex-col">
            <div className="flex border justify-between items-center border-gray-400 px-2 py-3 bg-sc-purple-normal rounded-t-lg">
                <h4 className="text-sm sm:text-base ">جمع کل: {totalPrice}</h4>
                <h4 className="text-sm sm:text-base r2l">باربری خارجی از {externalShipmentData.zoneName}</h4>
            </div>
            <div className="flex flex-col md:flex-row text-sm sm:text-base  flex-wrap  bg-sc-gray gap-4 border border-gray-400 border-t-0  p-2 py-6 sm:px-4 r2l">
                <div className="flex gap-1 justify-between sm:justify-normal  items-center r2l">
                    <span className="text-sc-gray-normal whitespace-nowrap">هزینه بارگیری:</span>
                    <span className="font-yekanX ss02">{formatPrice(externalShipmentData.externalShipmentCargoLoadPrice)}</span>
                </div>
                {externalShipmentData.externalShipmentCargoReloadPrice > 0 && (
                    <div className="flex gap-1 justify-between sm:justify-normal  items-center r2l">
                        <span className="text-sc-gray-normal whitespace-nowrap">هزینه توقف:</span>
                        <span className="font-yekanX ss02">{formatPrice(externalShipmentData.externalShipmentCargoReloadPrice)}</span>
                    </div>
                )}
                <div className="flex gap-1 justify-between sm:justify-normal  items-center r2l">
                    <span className="text-sc-gray-normal whitespace-nowrap">هزینه باربری:</span>
                    <p className="font-yekanX ss02 ">{`${formatPrice(externalShipmentData.externalShipmentPrice)}`}</p>
                </div>
                <div className="flex gap-1 justify-between sm:justify-normal  items-center r2l">
                    <span className="text-sc-gray-normal whitespace-nowrap">خودرو:</span>
                    <span className="font-yekanX ss02">{externalShipmentData.externalVehicleName}</span>
                </div>
                <div className="flex gap-1 justify-between sm:justify-normal  items-center r2l">
                    <span className="text-sc-gray-normal whitespace-nowrap">هزینه کل باربری خارجی:</span>
                    <span className="font-yekanX ss02">{formatPrice(externalShipmentData.externalTotalPrice)}</span>
                </div>
            </div>

            <div className="flex justify-center sm:justify-start items-center bg-sc-purple-normal text-sc-blue-normal rounded-b-lg border border-gray-400 border-t-0 gap-1  px-2 py-3 r2l">
                <AlertIcon size={16} />
                <p className="text-xs sm:text-base font-bold sm:font-normal">هزینه باربری خارجی (+توقف) پس از تحویل بار دریافت خواهد شد.</p>
            </div>
        </div>
    );
}

export default CheckoutExternalCosts;
