import { useEffect, useState } from 'react';
import CheckoutService from '../../../services/CheckoutService';
import Modal from '../../../components/uiComp/modals/Modal';
import AddressSelectContent from '../../../contents/checkout/AddressSelectContent';

function CheckoutShipment() {
    const checkoutService = new CheckoutService();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [provinceFullData, setProvinceFullData] = useState<ProvinceModel[]>([]);

    const [addressSelectTitle, setAddressSelectTitle] = useState('');
    const [addressSelectData, setAddressSelectData] = useState<AddressSelectInputProp[]>([]);
    const [addressSelectionType, setAddressSelectType] = useState('');
    const [addressSelectedValue, setAddressSelectedValue] = useState(0);

    /* Province selection */
    const [provinces, setProvinces] = useState<AddressSelectInputProp[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<AddressSelectInputProp>({ name: '', value: 0, valueString: '0' });

    /* City selection */
    const [cities, setCities] = useState<AddressSelectInputProp[]>([]);
    const [selectedCity, setSelectedCity] = useState<AddressSelectInputProp>({ name: '', value: 0, valueString: '0' });

    /* District selection */
    const [cityZones, setCityZones] = useState<AddressSelectInputProp[]>([]);
    const [selectedCityZone, setSelectedCityZone] = useState<AddressSelectInputProp>({ name: '', value: 0, valueString: 'none' });

    /* District Child selection */
    const [cityZoneDistricts, setCityZoneDistricts] = useState<AddressSelectInputProp[]>([]);
    const [selectedCityZoneDistrict, setSelectedCityZoneDistrict] = useState<AddressSelectInputProp>({ name: '', value: 0, valueString: 'none' });

    const [totalPrice, setTotalPrice] = useState('');
    const formatPrice = (price: number) => {
        const formater = new Intl.NumberFormat('fa-Ir');
        return `${formater.format(price)} تومان`;
    };

    const loadCityZones = async () => {
        try {
            var result = await checkoutService.GetCityZones<ProvinceModel[]>();
            setProvinceFullData(result);

            setProvinces(result.map((p) => ({ name: p.name, value: p.id, valueString: p.id.toString() })));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        loadCityZones();
    }, []);

    const ShowProvinceSelectModal = () => {
        setAddressSelectTitle('استان');
        setAddressSelectType('province');
        setAddressSelectedValue(selectedProvince.value);
        setAddressSelectData(provinces);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (selectedProvince.value) {
            const relatedCities: CityModel[] = provinceFullData.filter((p) => p.id === selectedProvince.value).flatMap((p) => p.cities);

            setCities(
                relatedCities.map((c) => ({
                    name: c.name,
                    value: c.id,
                    valueString: c.id.toString(),
                }))
            );
        }
    }, [selectedProvince]);

    const ShowCitySelectModal = () => {
        setAddressSelectTitle('شهر');
        setAddressSelectType('city');
        setAddressSelectData(cities);
        setAddressSelectedValue(selectedCity.value);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (selectedCity.value) {
            const relatedCityZones: DistrictsModel[] = provinceFullData
                .filter((p) => p.id === selectedProvince.value)
                .flatMap((p) => p.cities)
                .filter((c) => c.id === selectedCity.value)
                .flatMap((c) => c.districts);

            const distinctCityZones: AddressSelectInputProp[] = [];

            relatedCityZones.map((d) => {
                const item: AddressSelectInputProp = { name: d.number.toString(), value: d.number, valueString: d.number.toString() };

                if (!distinctCityZones.includes(item)) distinctCityZones.push(item);
            });

            setCityZones(distinctCityZones);
        }
    }, [selectedCity]);

    const ShowCityZoneSelectModal = () => {
        setAddressSelectTitle('منطقه');
        setAddressSelectType('cityZone');
        setAddressSelectData(cityZones);
        setAddressSelectedValue(selectedCityZone.value);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (selectedCity.value) {
            const relatedCityZoneDistricts: DistrctChild[] = provinceFullData
                .filter((p) => p.id === selectedProvince.value)
                .flatMap((p) => p.cities)
                .filter((c) => c.id === selectedCity.value)
                .flatMap((c) => c.districts)
                .filter((z) => z.number === selectedCityZone.value)
                .flatMap((z) => z.childs);

            const distinctCityZoneDistricts: AddressSelectInputProp[] = [];

            relatedCityZoneDistricts.map((d) => {
                const item: AddressSelectInputProp = { name: d.name, value: d.id, valueString: d.id.toString() };

                if (!distinctCityZoneDistricts.includes(item)) distinctCityZoneDistricts.push(item);
            });

            setCityZoneDistricts(distinctCityZoneDistricts);
        }
    }, [selectedCityZone]);

    const ShowCityZoneDistrictSelectModal = () => {
        setAddressSelectTitle('محله');
        setAddressSelectType('cityZoneDistrict');
        setAddressSelectData(cityZoneDistricts);
        setAddressSelectedValue(selectedCityZoneDistrict.value);
        setIsModalOpen(true);
    };

    const AddressSelectionDone = (selectionType: string, item: AddressSelectInputProp) => {
        setAddressSelectedValue(item.value);
        HandleSelectionTypes(selectionType, item);
        setIsModalOpen(false);
    };

    const HandleSelectionTypes = (selectionType: string, item: AddressSelectInputProp) => {
        switch (selectionType) {
            case 'province':
                //check if selected data new and if so, set selected city to empty
                if (selectedProvince.value !== item.value) {
                    setSelectedCity(emptySelectProp());
                    setSelectedCityZone(emptySelectProp());
                    setSelectedCityZoneDistrict(emptySelectProp());
                }
                setSelectedProvince(item);
                break;
            case 'city':
                //check if selected data new and if so, set selected city zone to empty
                if (selectedCity.value !== item.value) {
                    setSelectedCityZone(emptySelectProp());
                    setSelectedCityZoneDistrict(emptySelectProp());
                }
                setSelectedCity(item);
                break;
            case 'cityZone':
                //check if selected data new and if so, set selected city zone to empty
                if (selectedCityZone.value !== item.value) {
                    setSelectedCityZoneDistrict(emptySelectProp());
                }
                setSelectedCityZone(item);
                break;
            case 'cityZoneDistrict':
                setSelectedCityZoneDistrict(item);
                break;
        }
    };

    const emptySelectProp = () => {
        const emptyProp: AddressSelectInputProp = { name: '', value: 0, valueString: 'none' };
        return emptyProp;
    };

    return (
        <>
            {provinceFullData && (
                <>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center r2l">
                        <button
                            className="border rounded-lg bg-white px-4 py-2"
                            onClick={ShowProvinceSelectModal}>
                            استان: {selectedProvince.value == 0 ? 'انتخاب کنید' : selectedProvince.name}
                        </button>
                        <button
                            className="border rounded-lg bg-white px-4 py-2"
                            onClick={ShowCitySelectModal}>
                            شهر: {selectedCity.value == 0 ? 'انتخاب کنید' : selectedCity.name}
                        </button>
                        <button
                            className="border rounded-lg bg-white px-4 py-2"
                            onClick={ShowCityZoneSelectModal}>
                            منطقه: {selectedCityZone.valueString == 'none' ? 'انتخاب کنید' : selectedCityZone.name}
                        </button>
                        <button
                            className="border rounded-lg bg-white px-4 py-2"
                            onClick={ShowCityZoneDistrictSelectModal}>
                            محله: {selectedCityZoneDistrict.value == 0 ? 'انتخاب کنید' : selectedCityZoneDistrict.name}
                        </button>
                    </div>

                    <Modal
                        title={addressSelectTitle}
                        isOpen={isModalOpen}
                        onClose={closeModal}>
                        <AddressSelectContent
                            selectionData={addressSelectData}
                            selectionType={addressSelectionType}
                            selectedValue={addressSelectedValue}
                            onSelect={AddressSelectionDone}
                        />
                    </Modal>
                </>
            )}
        </>
    );
}

export default CheckoutShipment;
