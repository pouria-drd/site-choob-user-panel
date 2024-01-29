import { useEffect, useState } from 'react';
import Button from '../../../components/uiComp/buttons/Button';
import { ButtonTypes } from '../../../enums/ButtonTypes';

import { BASE_URL } from '../../../config';

import mellatLogo from '../../../assets/images/mellat.png';
interface CheckoutTotalCostAndPayProp {
    ProductsData: CheckoutModel;
    ExternalShipmentData?: ExternalShipmentModel;
    ShipmentDTO?: addShipmentDTO;
    canPay: boolean;
}

function CheckoutTotalCostAndPay({ ProductsData, ExternalShipmentData, canPay, ShipmentDTO }: CheckoutTotalCostAndPayProp) {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPrice, setTotalPrice] = useState('');
    const [totalProductsPrice, setTotalProductPrice] = useState('');
    const [ePayTotal, setEpayTotal] = useState('');

    const formatPrice = (price: number) => {
        const formater = new Intl.NumberFormat('fa-Ir');
        return `${formater.format(price)} تومان`;
    };

    useEffect(() => {
        let tPrice = 0;

        tPrice += ProductsData.internalShipmentPrice;
        ProductsData.zoneSellers.map((seller) => {
            tPrice += seller.totalPrice;
        });

        setTotalProductPrice(formatPrice(tPrice));

        const totalEpay = formatPrice(tPrice + (ExternalShipmentData == null ? 0 : ExternalShipmentData.externalShipmentCargoLoadPrice));
        setEpayTotal(totalEpay);
        if (ExternalShipmentData) tPrice += ExternalShipmentData.externalTotalPrice;

        setTotalPrice(formatPrice(tPrice));

        let totalPCount = 0;
        ProductsData.zoneSellers.map((s) =>
            s.products.map((p) => {
                totalPCount += p.count;
            })
        );

        setTotalProducts(totalPCount);
    }, [ProductsData, ExternalShipmentData]);

    const GoToPayment = () => {
        if (ExternalShipmentData) {
            window.open(BASE_URL + 'user/Checkout/PayInvoice?cityZoneId=' + ShipmentDTO?.cityZoneId + '&details=' + ShipmentDTO?.details, '_self');
        } else {
            window.open(BASE_URL + 'user/Checkout/PayInvoice', '_self');
        }
    };

    return (
        <>
            <div className={`flex flex-col border  rounded-lg ${canPay ? 'bg-white  border-sc-green-normal' : 'blur-[5px] border-sc-gray-normal cursor-not-allowed'}`}>
                <h4 className="text-sm sm:text-base font-bold border-b p-4 r2l">جمع کل فاکتور</h4>

                <div className="flex flex-col md:flex-row text-sm sm:text-base  flex-wrap gap-4   p-4 py-6 sm:px-4 r2l">
                    <div className="flex gap-1 justify-between sm:justify-normal items-center r2l">
                        <span className="text-sc-gray-normal whitespace-nowrap">تعداد کل:</span>
                        <span className="font-yekanX ss02">{totalProducts}</span>
                    </div>

                    <div className="flex gap-1 justify-between sm:justify-normal items-center r2l">
                        <span className="text-sc-gray-normal whitespace-nowrap">هزینه به احتساب داخلی:</span>
                        <p className="font-yekanX ss02 ">{totalProductsPrice}</p>
                    </div>

                    <div className="flex gap-1 justify-between sm:justify-normal items-center r2l">
                        <span className="text-sc-gray-normal whitespace-nowrap">هزینه کل باربری خارجی:</span>
                        {ExternalShipmentData && <span className="font-yekanX ss02">{formatPrice(ExternalShipmentData.externalTotalPrice)}</span>}
                        {!ExternalShipmentData && <span className="font-yekanX ss02">0</span>}
                    </div>

                    <div className="flex gap-1 justify-between sm:justify-normal items-center r2l">
                        <span className="text-sc-gray-normal whitespace-nowrap">جمع کل فاکتور:</span>
                        <p className="font-yekanX ss02 ">{totalPrice}</p>
                    </div>

                    <div className="flex gap-1 justify-between sm:justify-normal items-center r2l">
                        <span className="text-sc-gray-normal whitespace-nowrap">پرداخت آنلاین:</span>
                        <p className="font-yekanX ss02 ">{ePayTotal}</p>
                    </div>
                </div>

                <div className="flex w-full p-4 -mt-3">
                    <Button
                        text={
                            ProductsData.shopCartHasError ? (
                                'تسویه غیر فعال'
                            ) : (
                                <div className="flex items-center gap-2">
                                    پرداخت{' '}
                                    <img
                                        src={mellatLogo}
                                        width={30}
                                        alt="behpardakht"
                                    />
                                </div>
                            )
                        }
                        fullWidth={true}
                        Type={ProductsData.shopCartHasError ? ButtonTypes.Error : ButtonTypes.OulinedSuccess}
                        onClick={GoToPayment}
                        isDisabled={ProductsData.shopCartHasError || !canPay}
                    />
                </div>
            </div>
        </>
    );
}

export default CheckoutTotalCostAndPay;
