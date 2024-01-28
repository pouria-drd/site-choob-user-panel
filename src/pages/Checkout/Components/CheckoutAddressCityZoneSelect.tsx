import { useEffect, useState } from 'react';

import Modal from '../../../components/uiComp/modals/Modal';
import AddressSelectContent from '../../../contents/checkout/AddressSelectContent';

function CheckoutAddressCityZoneSelect({ ProvinceFullData, onValueChanged, user }: { ProvinceFullData: ProvinceModel[]; onValueChanged: (selectedCityZone: AddressSelectInputProp | undefined) => void; user: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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

    const LoadData = async () => {
        setProvinces(ProvinceFullData.map((p) => ({ name: p.name, value: p.id, valueString: p.id.toString() })));
    };

    useEffect(() => {
        LoadData();
    }, []);

    useEffect(() => {
        if (!user) return;
        //check for the user address.
        //get last address from user saved session item
        const userAddress = user.addressList[user.addressList.length - 1];

        //dont continue if user has no city (??)
        if (!userAddress.city) return;

        const userCityId = userAddress.city.id;
        const userProvinceId = userAddress.city.provinceId;

        //find related province -> city -> cityZone -> district..
        const userRelatedProvince = ProvinceFullData.find((p) => p.id == userProvinceId);
        if (!userRelatedProvince) return;

        const userRelatedCity = userRelatedProvince?.cities.find((c) => c.id == userCityId);
        if (!userRelatedCity) return;

        const userRelatedCityZone = userRelatedCity?.districts.filter((z) => z.childs.filter((child) => child.id == userAddress.cityZoneId));
        if (!userRelatedCityZone) return;

        const userRelatedCityZoneDistrict = userRelatedCityZone[0].childs.find((d) => d.id == userAddress.cityZoneId);
        if (!userRelatedCityZoneDistrict) return;

        //set related items to their props..
        setSelectedProvince({ name: userRelatedProvince.name, value: userRelatedProvince.id, valueString: userRelatedProvince.id.toString() });

        setSelectedCity({ name: userRelatedCity.name, value: userRelatedCity.id, valueString: userRelatedCity.id.toString() });

        setSelectedCityZone({ name: userRelatedCityZone[0].number.toString(), value: userRelatedCityZone[0].number, valueString: userRelatedCityZone[0].number.toString() });

        setSelectedCityZoneDistrict({ name: userRelatedCityZoneDistrict.name, value: userRelatedCityZoneDistrict.id, valueString: userRelatedCityZoneDistrict.id.toString() });
    }, [provinces]);

    const ShowProvinceSelectModal = () => {
        setAddressSelectTitle('استان');
        setAddressSelectType('province');
        setAddressSelectedValue(selectedProvince.value);
        setAddressSelectData(provinces);
        openModal();
    };

    useEffect(() => {
        if (selectedProvince.value) {
            const relatedCities: CityModel[] = ProvinceFullData.filter((p) => p.id === selectedProvince.value).flatMap((p) => p.cities);

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
        openModal();
    };

    useEffect(() => {
        if (selectedCity.value) {
            const relatedCityZones: DistrictsModel[] = ProvinceFullData.filter((p) => p.id === selectedProvince.value)
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
        openModal();
    };

    useEffect(() => {
        if (selectedCity.value) {
            const relatedCityZoneDistricts: DistrctChild[] = ProvinceFullData.filter((p) => p.id === selectedProvince.value)
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
        openModal();
    };

    const AddressSelectionDone = (selectionType: string, item: AddressSelectInputProp) => {
        setAddressSelectedValue(item.value);
        HandleSelectionTypes(selectionType, item);
        closeModal();
    };

    const HandleSelectionTypes = (selectionType: string, item: AddressSelectInputProp) => {
        switch (selectionType) {
            case 'province':
                //check if selected data new and if so, set selected city to empty
                if (selectedProvince.value !== item.value) {
                    setSelectedCity(emptySelectProp());
                    setSelectedCityZone(emptySelectProp());
                    setSelectedCityZoneDistrict(emptySelectProp());
                    selectedCityZoneChanged();
                }
                setSelectedProvince(item);
                break;
            case 'city':
                //check if selected data new and if so, set selected city zone to empty
                if (selectedCity.value !== item.value) {
                    setSelectedCityZone(emptySelectProp());
                    setSelectedCityZoneDistrict(emptySelectProp());
                    selectedCityZoneChanged();
                }
                setSelectedCity(item);
                break;
            case 'cityZone':
                //check if selected data new and if so, set selected city zone to empty
                if (selectedCityZone.value !== item.value) {
                    setSelectedCityZoneDistrict(emptySelectProp());
                    selectedCityZoneChanged();
                }
                setSelectedCityZone(item);
                break;
            case 'cityZoneDistrict':
                setSelectedCityZoneDistrict(item);
                selectedCityZoneChanged(item);
                break;
        }
    };

    const emptySelectProp = () => {
        const emptyProp: AddressSelectInputProp = { name: '', value: 0, valueString: 'none' };
        return emptyProp;
    };

    const selectedCityZoneChanged = (item?: AddressSelectInputProp) => {
        onValueChanged(item);
    };

    return (
        <>
            {ProvinceFullData && (
                <>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center r2l">
                        <button
                            className="border rounded-lg bg-white hover:bg-sc-purple-normal
                            disabled:cursor-not-allowed disabled:text-gray-500
                            px-4 py-2 w-full"
                            onClick={ShowProvinceSelectModal}>
                            استان: {selectedProvince.value == 0 ? 'انتخاب کنید' : selectedProvince.name}
                        </button>
                        <button
                            className="border rounded-lg bg-white hover:bg-sc-purple-normal
                            disabled:cursor-not-allowed disabled:text-gray-500
                            px-4 py-2 w-full"
                            onClick={ShowCitySelectModal}
                            disabled={selectedProvince.value == 0}>
                            شهر: {selectedCity.value == 0 ? 'انتخاب کنید' : selectedCity.name}
                        </button>
                        <button
                            className="border rounded-lg bg-white hover:bg-sc-purple-normal
                            disabled:cursor-not-allowed disabled:text-gray-500
                            px-4 py-2 w-full"
                            onClick={ShowCityZoneSelectModal}
                            disabled={selectedCity.value == 0}>
                            منطقه: {selectedCityZone.valueString == 'none' ? 'انتخاب کنید' : selectedCityZone.name === '0' ? 'سایر' : selectedCityZone.name}
                        </button>
                        <button
                            className="border rounded-lg bg-white hover:bg-sc-purple-normal
                            disabled:cursor-not-allowed disabled:text-gray-500
                            px-4 py-2 w-full"
                            onClick={ShowCityZoneDistrictSelectModal}
                            disabled={selectedCityZone.valueString == 'none'}>
                            محله: {selectedCityZoneDistrict.value == 0 ? 'انتخاب کنید' : selectedCityZoneDistrict.name === '0' ? 'سایر' : selectedCityZoneDistrict.name}
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

export default CheckoutAddressCityZoneSelect;
