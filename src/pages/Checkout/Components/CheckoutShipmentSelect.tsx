import { useEffect, useState } from 'react';
import CheckoutAddressCityZoneSelect from './CheckoutAddressCityZoneSelect';
import CheckoutService from '../../../services/CheckoutService';
import Spinner from '../../../components/uiComp/spinner/Spinner';
import CheckoutExternalCosts from './CheckoutExternalCosts';

function CheckoutShipmentSelect({ ProvinceFullData, onValueChanged, onCanPay }: { ProvinceFullData: ProvinceModel[]; onValueChanged: (callbackResut: ExternalShipmentModel, dto: addShipmentDTO | undefined) => void; onCanPay: (value: boolean) => void }) {
    const checkoutService = new CheckoutService();
    const [user, setUser] = useState<any>();

    const [isSelfDelivery, setIsSelfDelivery] = useState(false);
    const [addressDetails, setAddressDetails] = useState('');
    const [addressCityZoneId, setAddressCityZoneId] = useState(0);

    const [dto, setDTO] = useState<addShipmentDTO>({ cityZoneId: 0, details: '' });

    const [isLoading, setIsLoading] = useState(false);
    const [calculatedShipment, setCalculatedShipment] = useState<ExternalShipmentModel[]>([]);

    const handleInputChange = (value: string) => {
        setDTO((prevDTO) => ({
            ...prevDTO,
            details: value,
        }));
        setAddressDetails(value);
    };

    const onCityZoneSelectionChanged = (item: AddressSelectInputProp | undefined) => {
        if (!item) {
            setDTO((prevDTO) => ({
                ...prevDTO,
                cityZoneId: 0,
            }));
            setAddressCityZoneId(0);
        } else {
            setDTO((prevDTO) => ({
                ...prevDTO,
                cityZoneId: item.value,
            }));
            setAddressCityZoneId(item.value);
        }
    };

    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        if (!userJson) return;
        setUser(JSON.parse(userJson));
    }, [ProvinceFullData]);

    useEffect(() => {
        if (user) {
            setAddressDetails(user.addressList[user.addressList.length - 1].details);
            const defaultDTO: addShipmentDTO = { cityZoneId: user.addressList[user.addressList.length - 1].cityZoneId, details: user.addressList[user.addressList.length - 1].details };

            setDTO(defaultDTO);
            setAddressCityZoneId(defaultDTO.cityZoneId);
        }
    }, [user]);

    useEffect(() => {
        onValueChanged(calculatedShipment[0], dto);
    }, [dto]);

    useEffect(() => {
        onValueChanged(calculatedShipment[0], dto);
    }, [calculatedShipment]);

    useEffect(() => {
        calculateShipment();
    }, [addressCityZoneId]);

    const calculateShipment = async () => {
        onCanPay(false);
        if (dto.cityZoneId === 0) {
            setCalculatedShipment([]);
            return;
        }

        setIsLoading(true);

        try {
            const result = await checkoutService.CalculateShipment<ExternalShipmentModel[]>(dto);
            setCalculatedShipment(result);
        } catch (e) {
            console.log(e);
        }
        onCanPay(true);
        setIsLoading(false);
    };

    useEffect(() => {}, [calculatedShipment]);

    const handleDeliveryOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelfDelivery(event.target.id === 'selfDeliveryRadioBtn');
    };

    useEffect(() => {
        if (isSelfDelivery) {
            setCalculatedShipment([]);
        } else {
            calculateShipment();
        }
    }, [isSelfDelivery]);

    return (
        <div className="flex flex-col gap-1">
            <fieldset className="flex items-center gap-2 r2l mb-4 text-base sm:text-lg">
                <div className="flex items-center gap-1">
                    <input
                        type="radio"
                        name="deliveryOption"
                        id="shipmentDeliveryRadioBtn"
                        checked={!isSelfDelivery}
                        onChange={handleDeliveryOptionChange}
                    />
                    <label
                        htmlFor="shipmentDeliveryRadioBtn"
                        className={`${isSelfDelivery ? 'text-gray-600' : 'text-sc-blue-normal'}`}>
                        ارسال با باربری
                    </label>
                </div>
                <div className="flex items-center gap-1">
                    <input
                        type="radio"
                        name="deliveryOption"
                        id="selfDeliveryRadioBtn"
                        checked={isSelfDelivery}
                        onChange={handleDeliveryOptionChange}
                    />
                    <label
                        htmlFor="selfDeliveryRadioBtn"
                        className={`${!isSelfDelivery ? 'text-gray-600' : 'text-sc-blue-normal'}`}>
                        تحویل حضوری
                    </label>
                </div>
            </fieldset>
            {!isSelfDelivery && (
                <>
                    <CheckoutAddressCityZoneSelect
                        ProvinceFullData={ProvinceFullData}
                        user={user}
                        onValueChanged={onCityZoneSelectionChanged}
                    />
                    <div className="flex flex-col bg-white rounded-lg border p-1">
                        <span className="text-right text-sm sm:text-base text-sc-gray-normal w-full pr-2 py-1 border-b">جزئیات آدرس</span>
                        <input
                            className="font-peyda bg-sc-white hover:bg-sc-purple-normal  transition-all outline-none  placeholder:text-gray-400 rounded px-4 py-2 r2l w-full mt-2"
                            placeholder="خیابان، کوچه، پلاک ..."
                            value={addressDetails}
                            maxLength={64}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                    </div>

                    {isLoading && <Spinner flex={true} />}
                    {!isLoading && calculatedShipment.length > 0 && <CheckoutExternalCosts externalShipmentData={calculatedShipment[0]} />}
                </>
            )}
        </div>
    );
}

export default CheckoutShipmentSelect;
