import { useEffect, useState } from 'react';
import CheckoutService from '../../services/CheckoutService';
import CheckoutProductTable from './Components/CheckoutProductTable';
import CheckoutInteralPrices from './Components/CheckoutInteralPrices';
import Spinner from '../../components/uiComp/spinner/Spinner';
import Button from '../../components/uiComp/buttons/Button';

import CheckoutShipmentSelect from './Components/CheckoutShipmentSelect';
import CheckoutTotalCostAndPay from './Components/CheckoutTotalCostAndPay';
import { ButtonTypes } from '../../enums/ButtonTypes';

function CheckoutPage() {
    const checkoutService = new CheckoutService();

    const [checkoutData, setCheckoutData] = useState<CheckoutModel[]>([]);
    const [calculatedShipment, setCalculatedShipment] = useState<ExternalShipmentModel>();

    //Address full province data
    const [provinceFullData, setProvinceFullData] = useState<ProvinceModel[]>([]);

    const [dataIsLoading, setDataIsLoading] = useState(false);

    const [isInShipment, setIsInShipment] = useState(false);

    const [canPay, setCanPay] = useState(false);

    const loadCheckout = async () => {
        setDataIsLoading(true);
        try {
            const result = await checkoutService.GetCheckout<any>();

            if (!result) {
                //TODO: not found stuff??
                return;
            }

            if (result.status === false) {
                //TODO: show error toast??
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
                                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-sc-blue-normal text-right ">صورت حساب</h4>
                            </div>

                            {isInShipment && (
                                <CheckoutShipmentSelect
                                    ProvinceFullData={provinceFullData}
                                    onValueChanged={(item) => {
                                        console.log(item);
                                        setCalculatedShipment(item);
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
                                    canPay={canPay}
                                />
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default CheckoutPage;
