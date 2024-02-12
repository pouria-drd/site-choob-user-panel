interface DrawerDoorDTO {
    Color: SimpleColorDTO;
    height: number;
}

interface SimpleDrawerUnitDTO {
    width: number;
    height: number;
    depth: number;
    isEvenDoors: boolean;
    legColor: SimpleColorDTO;
    drawerDoors: DrawerDoorDTO[];
}

interface HiddenHandleDrawerUnitDTO extends SimpleDrawerUnitDTO {
    topGap: number;
}
