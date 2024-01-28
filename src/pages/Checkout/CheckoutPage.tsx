import { useEffect, useState } from 'react';
import CheckoutService from '../../services/CheckoutService';
import CheckoutProductTable from './Components/CheckoutProductTable';
import CheckoutInteralPrices from './Components/CheckoutInteralPrices';
import Spinner from '../../components/uiComp/spinner/Spinner';
import Button from '../../components/uiComp/buttons/Button';

import CheckoutShipmentSelect from './Components/CheckoutShipmentSelect';
import CheckoutTotalCostAndPay from './Components/CheckoutTotalCostAndPay';
import { ButtonTypes } from '../../enums/ButtonTypes';
import RefreshIcon from '../../components/icons/RefreshIcon';

function CheckoutPage() {
    const checkoutService = new CheckoutService();

    const [checkoutData, setCheckoutData] = useState<CheckoutModel[]>([]);
    const [calculatedShipment, setCalculatedShipment] = useState<ExternalShipmentModel>();
    const [ShipmentDTO, setShipmentDTO] = useState<addShipmentDTO>();

    //Address full province data
    const [provinceFullData, setProvinceFullData] = useState<ProvinceModel[]>([]);

    const [dataIsLoading, setDataIsLoading] = useState(false);

    const [isInShipment, setIsInShipment] = useState(false);

    const [canPay, setCanPay] = useState(false);

    const loadCheckout = async () => {
        setDataIsLoading(true);
        setIsInShipment(false);
        setCheckoutData([]);
        try {
            const result = await checkoutService.GetCheckout<any>();

            if (!result) {
                //TODO: not found stuff??
                setDataIsLoading(false);
                return;
            }

            if (result.status === false) {
                //TODO: show error toast??
                setDataIsLoading(false);
                return;
            }

            //get province full data..
            //TODO: no need if checkout has error..

            var addressData = await checkoutService.GetCityZones<ProvinceModel[]>();
            setProvinceFullData(addressData);

            setCheckoutData(result.data as CheckoutModel[]);
        } catch (e) {
            const exp = e as any;
            console.error(exp);
        }
        setDataIsLoading(false);
    };

    useEffect(() => {
        loadCheckout();
    }, []);

    return (
        <>
            {dataIsLoading && (
                <Spinner
                    size={40}
                    flex={true}
                />
            )}
            {!dataIsLoading && (
                <div className="flex flex-col gap-4 font-peyda pb-14">
                    {checkoutData.length > 0 && (
                        <>
                            <div className="flex justify-between items-center">
                                {isInShipment && (
                                    <Button
                                        text="بازگشت"
                                        Type={ButtonTypes.OulinedInfo}
                                        onClick={() => {
                                            setIsInShipment(false);
                                        }}
                                    />
                                )}
                                {!isInShipment && (
                                    <Button
                                        text={checkoutData[0].shopCartHasError ? 'تسویه غیر فعال' : 'ادامه و پرداخت'}
                                        Type={checkoutData[0].shopCartHasError ? ButtonTypes.Error : ButtonTypes.OulinedInfo}
                                        onClick={() => {
                                            setIsInShipment(true);
                                        }}
                                        isDisabled={checkoutData[0].shopCartHasError}
                                    />
                                )}
                                <div className="flex gap-1 items-center">
                                    <button
                                        className="bg-white transition-all outline outline-1 outline-gray-300 rounded-md p-1 text-sc-blue-normal hover:bg-sc-purple-normal hover:outline-gray-400"
                                        onClick={loadCheckout}>
                                        <div className="transition-all hover:rotate-180">
                                            <RefreshIcon size={15} />
                                        </div>
                                    </button>
                                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-sc-blue-normal text-right ">صورت حساب</h4>
                                </div>
                            </div>

                            {isInShipment && (
                                <CheckoutShipmentSelect
                                    ProvinceFullData={provinceFullData}
                                    onValueChanged={(item, dto) => {
                                        setCalculatedShipment(item);
                                        if (dto) {
                                            setShipmentDTO(dto);
                                        }
                                    }}
                                    onCanPay={(value) => setCanPay(value)}
                                />
                            )}
                            {!isInShipment && (
                                <>
                                    <div className="flex flex-col gap-4 bg-white rounded-lg p-2 sm:p-4">
                                        <CheckoutProductTable sellers={checkoutData[0].zoneSellers} />

                                        {checkoutData[0].hasInternalShipment && <CheckoutInteralPrices checkoutData={checkoutData[0]} />}
                                    </div>
                                </>
                            )}

                            {isInShipment && (
                                <CheckoutTotalCostAndPay
                                    ProductsData={checkoutData[0]}
                                    ExternalShipmentData={calculatedShipment}
                                    ShipmentDTO={ShipmentDTO}
                                    canPay={canPay}
                                />
                            )}
                        </>
                    )}

                    {checkoutData.length == 0 && (
                        <div className="flex flex-col justify-center items-center gap-2 r2l bg-white rounded-lg h-96">
                            <p>سبد خرید شما خالی است.</p>
                            <Button
                                Type={ButtonTypes.OulinedInfo}
                                text={
                                    <div className="flex gap-1 justify-center items-center">
                                        <div className="transition-all hover:rotate-180">
                                            <RefreshIcon />
                                        </div>
                                        بروزرسانی
                                    </div>
                                }
                                onClick={loadCheckout}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default CheckoutPage;
