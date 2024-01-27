import AxiosBase from './AxiosBase';

class CheckoutService extends AxiosBase {
    public async GetCheckout<T>() {
        const url = 'Customer/Checkout';
        return this.request<T>({ method: 'get', url });
    }
}

export default CheckoutService;
