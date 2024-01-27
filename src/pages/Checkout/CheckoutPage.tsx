import { useEffect, useState } from 'react';
import CheckoutService from '../../services/CheckoutService';
import CheckoutProductTable from './Components/CheckoutProductTable';
import CheckoutInteralPrices from './Components/CheckoutInteralPrices';
import Spinner from '../../components/uiComp/spinner/Spinner';
import Button from '../../components/uiComp/buttons/Button';
import { StatusEnum } from '../../enums/StatusEnum';

function CheckoutPage() {
    const checkoutService = new CheckoutService();

    const [checkoutData, setCheckoutData] = useState<CheckoutModel[]>([]);
    const [dataIsLoading, setDataIsLoading] = useState(false);

    const [isInShipment, setIsInShipment] = useState(false);

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

            setCheckoutData(result.data as CheckoutModel[]);
        } catch (e) {
            const exp = e as any;
            console.error(exp);
        }
        //Fake delay
        setTimeout(() => {
            setDataIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        loadCheckout();
    }, []);

    return (
        <>
            {dataIsLoading && (
                <Spinner
                    flex={true}
                    containerCss="h-10"
                />
            )}
            {!dataIsLoading && (
                <div className="flex flex-col gap-4 font-peyda pb-14">
                    <div className="flex justify-between items-center">
                        {isInShipment && (
                            <Button
                                text="بازگشت"
                                onClick={() => {
                                    setIsInShipment(false);
                                }}
                            />
                        )}
                        {!isInShipment && (
                            <Button
                                text="ادامه و پرداخت"
                                onClick={() => {
                                    setIsInShipment(true);
                                }}
                            />
                        )}
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-sc-blue-normal text-right ">صورت حساب</h4>
                    </div>

                    {checkoutData.length > 0 && (
                        <>
                            {isInShipment && <p>asd</p>}
                            {!isInShipment && (
                                <>
                                    <div className="flex flex-col gap-4 bg-white rounded-lg p-2 sm:p-4">
                                        <CheckoutProductTable sellers={checkoutData[0].zoneSellers} />

                                        {checkoutData[0].hasInternalShipment && <CheckoutInteralPrices checkoutData={checkoutData[0]} />}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <div className="flex w-full bg-white rounded-lg p-4">
                        {!isInShipment && (
                            <Button
                                text="پرداخت"
                                Type={StatusEnum.Success}
                                onClick={() => {
                                    setIsInShipment(true);
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default CheckoutPage;
