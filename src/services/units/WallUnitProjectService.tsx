import UnitProjectBase from './UnitProjectBase';

class WallUnitProjectService extends UnitProjectBase {
    protected baseURL: string = 'UnitProject/';

    //Calculate unit Stuff
    public async CalculatedSimpleWallUnit<T>(dto: SimpleWallUnitDTO) {
        const url = this.baseURL + 'SimpleWallUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculatedSimpleWallUnitWithPillar<T>(dto: SimpleWallUnitWithPillarDTO) {
        const url = this.baseURL + 'SimpleWallUnitWithPillar';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculatedFixdedWallUnit<T>(dto: FixedWallUnitDTO) {
        const url = this.baseURL + 'FixedWallUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }
}

export default WallUnitProjectService;
