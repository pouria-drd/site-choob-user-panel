interface CheckoutModel {
    cargoLoadPrice: number;

    cargoReloadPrice: number;

    externalShipmentCargoLoadPrice: number;

    externalShipmentCargoReloadPrice: number;

    externalShipmentPrice: number;

    externalVehicleId: number;

    externalVehicleName: string;

    hasCut: boolean;

    hasInternalShipment: boolean;

    internalShipmentFee: number;

    internalShipmentPrice: number;

    internalVehicleId: number;

    internalVehicleName: string;

    shopCartError: boolean;

    shopCartHasError: boolean;

    totalItems: number;

    totalZoneWarehouses: number;

    zoneSellers: ZoneSeller[];
    zoneId: number;
    zoneName: string;
}

interface ZoneSeller {
    sellerCutter: boolean;
    sellerGuid: string;
    sellerName: string;
    totalPrice: number;
    products: SellerProduct[];
}

interface SellerProduct {
    calculatedPrice: number;
    count: number;
    description: string;
    fee: number;
    hasDimensions: boolean;
    index: number;
    priceId: number;
    productGuid: string;
    productName: string;
    status: string;
    DimensionModel: DimensionDetailModel;
    warehouses: any[];
}
