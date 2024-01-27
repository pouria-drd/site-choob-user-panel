import { useEffect, useState } from 'react';
import CheckoutService from '../../services/CheckoutService';
import CheckoutProductTable from './Components/CheckoutProductTable';

function AdminPage() {
    const checkoutService = new CheckoutService();

    const [checkoutData, setCheckoutData] = useState<CheckoutModel[]>([]);

    const loadCheckout = async () => {
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
            console.log(checkoutData[0]);
        } catch (e) {
            const exp = e as any;
            console.error(exp);
        }
    };

    useEffect(() => {
        loadCheckout();
    }, []);

    return (
        <div className="flex flex-col gap-4 font-peyda">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-sc-blue-normal text-right">صورت حساب</h4>
            {checkoutData.length > 0 && (
                <div className="flex flex-col gap-2 bg-white rounded-lg p-4">
                    <CheckoutProductTable sellers={checkoutData[0].zoneSellers} />
                </div>
            )}
        </div>
    );
}

export default AdminPage;
