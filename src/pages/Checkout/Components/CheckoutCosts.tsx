import { useEffect, useState } from 'react';

function CheckoutCosts({ checkoutData }: { checkoutData: CheckoutModel }) {
    const [totalPrice, setTotalPrice] = useState('');
    const formatPrice = (price: number) => {
        const formater = new Intl.NumberFormat('fa-Ir');
        return `${formater.format(price)} تومان`;
    };

    useEffect(() => {
        let tPrice = 0;

        tPrice += checkoutData.cargoLoadPrice;
        tPrice += checkoutData.cargoReloadPrice;

        checkoutData.zoneSellers.map((seller) => {
            tPrice += seller.totalPrice;
        });

        setTotalPrice(formatPrice(tPrice));
    }, [checkoutData]);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex border border-gray-400 p-2 bg-sc-purple-normal">
                <h4 className="sm:text-lg">جمع کل: {totalPrice}</h4>
            </div>
        </div>
    );
}

export default CheckoutCosts;
