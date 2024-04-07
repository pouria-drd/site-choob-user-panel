import UnitProjectBase from './UnitProjectBase';

class CornerUnitProjectService extends UnitProjectBase {
    protected baseURL: string = 'UnitProject/';

    public async CalculatedGroundSimpleCornerUnit<T>(dto: SimpleGroundCornerDTO) {
        const url = this.baseURL + 'GroundSimpleCornerUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculatedGroundCornerUnitWithPillar<T>(dto: SimpleGroundCornerDTO) {
        const url = this.baseURL + 'GroundCornerUnitWithPillar';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculatedWallSimpleCornerUnit<T>(dto: SimpleWallCornerDTO) {
        const url = this.baseURL + 'WallSimpleCornerUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculatedWallCornerUnitWithPillar<T>(dto: WallCornerWithPillarDTO) {
        const url = this.baseURL + 'WallCornerUnitWithPillar';
        return this.request<T>({ method: 'post', url, data: dto });
    }
}

export default CornerUnitProjectService;
