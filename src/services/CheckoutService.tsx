import AxiosBase from './AxiosBase';

class CheckoutService extends AxiosBase {
    public async GetCheckout<T>() {
        const url = 'Customer/Checkout';
        return this.request<T>({ method: 'get', url });
    }

    public async GetCityZones<T>() {
        const url = 'Address/fullProvinces';
        return this.request<T>({ method: 'get', url });
    }
}

export default CheckoutService;
