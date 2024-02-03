interface SimpleGroundUnitDTO {
    width: number;
    height: number;
    depth: number;
    shelfCount: number;
    legColor: SimpleColorDTO;
    doors: SimpleColorDTO[];
}

interface SimpleGroundUnitWithPillarDTO {
    width: number;
    height: number;
    depth: number;
    pillarWidth: number;
    pillarDepth: number;
    shelfCount: number;
    legColor: SimpleColorDTO;
    doors: SimpleColorDTO[];
}

interface FixedGroundUnitDTO {
    width: number;
    height: number;
    depth: number;
    fixedWidth: number;
    FixedWidthColor: SimpleColorDTO;
    shelfCount: number;
    legColor: SimpleColorDTO;
    doors: SimpleColorDTO[];
}

interface FixedGroundUnitWithPillarDTO {
    width: number;
    height: number;
    depth: number;
    pillarWidth: number;
    pillarDepth: number;
    fixedWidth: number;
    FixedWidthColor: SimpleColorDTO;
    shelfCount: number;
    legColor: SimpleColorDTO;
    doors: SimpleColorDTO[];
}

interface SimpleColorDTO {
    colorName: string;
    doorType?: string;
}
