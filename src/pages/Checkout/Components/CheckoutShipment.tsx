import { useEffect, useState } from 'react';
import CheckoutService from '../../../services/CheckoutService';

function CheckoutShipment() {
    const checkoutService = new CheckoutService();

    const [totalPrice, setTotalPrice] = useState('');
    const formatPrice = (price: number) => {
        const formater = new Intl.NumberFormat('fa-Ir');
        return `${formater.format(price)} تومان`;
    };

    const loadCityZones = async () => {
        try {
            var result = await checkoutService.GetCityZones<ProvinceModel[]>();
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        loadCityZones();
    }, []);

    return <p>asd</p>;
}

export default CheckoutShipment;
