interface SimpleWallUnitDTO {
    width: number;
    height: number;
    depth: number;
    shelfCount: number;
    hasHiddenHandle: boolean;
    doorExtraHeight: number;
    doors: SimpleColorDTO[];
}

interface FixedWallUnitDTO extends SimpleWallUnitDTO {
    fixedWidth: number;
    fixedWidthColor: SimpleColorDTO;
}

interface SimpleWallUnitWithPillarDTO extends SimpleWallUnitDTO {
    pillarWidth: number;
    pillarDepth: number;
}

interface FixedWallUnitWithPillarDTO extends FixedWallUnitDTO {
    pillarWidth: number;
    pillarDepth: number;
}

interface WallCoverUnitDTO {
    width: number;
    height: number;
    depth: number;
    hasHiddenHandle: boolean;
    doorExtraHeight: number;
    doors: SimpleColorDTO[];
}

interface WallAbchekanDTO {
    width: number;
    height: number;
    depth: number;
    bottomDoorHeight: number;
    doorExtraHeight: number;
    doorsHorizontalGap: number;
    hasHiddenHandle: boolean;
    isTopDoorHorizontal: boolean;
    topHorizontalDoorColor: SimpleColorDTO;
    bottomDoorColor: SimpleColorDTO;
    doors: SimpleColorDTO[];
}

interface WallHoodUnitDTO {
    width: number;
    height: number;
    depth: number;

    wallColor: SimpleColorDTO;
}

interface WallHiddenHandleUnitDTO {
    width: number;
    height: number;
    depth: number;

    doorsHorizontalGap: number;
    isTopDoorHorizontal: boolean;
    isBottomDoorHorizontal: boolean;

    doorExtraHeight: number;
    bottomDoorHeight: number;

    bottomDoors: SimpleColorDTO[];
    topDoors: SimpleColorDTO[];
}