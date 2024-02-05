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
