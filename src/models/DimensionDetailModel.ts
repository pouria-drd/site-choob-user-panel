interface DimensionCutModel {
    x: number;
    y: number;
    guid?: string;
    count: number;
    details?: string;
    pvctop: boolean;
    pvcleft: boolean;
    pvcright: boolean;
    pvcbottom: boolean;
    xGroove: boolean;
    yGroove: boolean;
    xGazor: boolean;
    yGazor: boolean;
    fTop: boolean;
    fRight: boolean;
    fBottom: boolean;
    fLeft: boolean;
}

interface DimensionDetailModel {
    id: string;
    title: string;
    userGuid: string;
    pvcColor: string;
    description: string;
    woodSheetDimensions: string;

    dimensions: DimensionCutModel[];

    woodSheetCount: number;
    woodSheetDimensionsId: number;

    isInUse: boolean;
    sentForCut: boolean;
    isConfirmed: boolean;
    isProccessing: boolean;
    isNotRotatable: boolean;
}

interface DimensionNewCutModel {
    x?: number;
    y?: number;
    dimensionId: string;
    count?: number;
    details?: string;
    pvctop: boolean;
    pvcleft: boolean;
    pvcright: boolean;
    pvcbottom: boolean;
    xGroove: boolean;
    yGroove: boolean;
    xGazor: boolean;
    yGazor: boolean;
    fTop: boolean;
    fRight: boolean;
    fBottom: boolean;
    fLeft: boolean;
}

interface WoodSheetDimension {
    id: number;
    dimensions: string;
    thickness: string;
}
