interface SimpleGroundUnitDTO {
    width: number;
    height: number;
    depth: number;
    doors: SimpleDoorDTO[];
}

interface SimpleDoorDTO {
    colorName: string;
    doorType?: string;
}
