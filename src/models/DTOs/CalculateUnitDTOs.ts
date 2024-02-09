interface SimpleGroundUnitDTO {
    width: number;
    height: number;
    depth: number;
    shelfCount: number;
    hasHiddenHandle: boolean;
    hiddenHandleTopGap: number;
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
    hasHiddenHandle: boolean;
    hiddenHandleTopGap: number;
    legColor: SimpleColorDTO;
    doors: SimpleColorDTO[];
}

interface FixedGroundUnitDTO {
    width: number;
    height: number;
    depth: number;
    fixedWidth: number;
    fixedWidthColor: SimpleColorDTO;
    shelfCount: number;
    hasHiddenHandle: boolean;
    hiddenHandleTopGap: number;
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
    fixedWidthColor: SimpleColorDTO;
    shelfCount: number;
    hasHiddenHandle: boolean;
    hiddenHandleTopGap: number;
    legColor: SimpleColorDTO;
    doors: SimpleColorDTO[];
}

interface YakhchalUnitDTO {
    width: number;
    height: number;
    depth: number;

    topHeight: number;
    topDepth: number;

    hasHiddenHandle: boolean;
    doorExtraHeight: number;

    isTopDoorHorizontal: boolean;

    useColorForBottom: boolean;
    bottomColor: SimpleColorDTO;
    doors: SimpleColorDTO[];
}

interface SimpleColorDTO {
    colorName: string;
    doorType?: string;
}
