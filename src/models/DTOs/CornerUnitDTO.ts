interface SimpleGroundCornerDTO {
    rightWidth: number;
    leftWidth: number;
    height: number;
    rightDepth: number;
    leftDepth: number;
    shelfCount: number;

    legColor: SimpleColorDTO;
    doors: SimpleColorDTO[];
}

interface GroundCornerWithPillarDTO extends SimpleGroundCornerDTO {
    pillarWidth: number;
    pillarDepth: number;
}

interface SimpleWallCornerDTO {
    rightWidth: number;
    leftWidth: number;
    height: number;
    rightDepth: number;
    leftDepth: number;
    shelfCount: number;

    hasHiddenHandle: boolean;
    doorExtraHeight: number;

    legColor: SimpleColorDTO;
    doors: SimpleColorDTO[];
}

interface WallCornerWithPillarDTO extends SimpleWallCornerDTO {
    pillarWidth: number;
    pillarDepth: number;
}
