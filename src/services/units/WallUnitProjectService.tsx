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

    public async CalculatedFixdedWallUnitWithPillar<T>(dto: FixedWallUnitWithPillarDTO) {
        const url = this.baseURL + 'FixedWallUnitWithPillar';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculatedWallCoverUnit<T>(dto: WallCoverUnitDTO) {
        const url = this.baseURL + 'CalculatedWallCoverUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculatedAbchekanUnit<T>(dto: WallAbchekanDTO) {
        const url = this.baseURL + 'CalculatedAbchekanUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculatedHoodUnit<T>(dto: WallHoodUnitDTO) {
        const url = this.baseURL + 'CalculatedHoodUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculatedHiddenHandleUnit<T>(dto: WallHiddenHandleUnitDTO) {
        const url = this.baseURL + 'CalculatedWallHiddenHandleUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculatedTwoPartUnit<T>(dto: WallTwoPartUnitDTO) {
        const url = this.baseURL + 'CalculatedWallTwoPartUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }
}

export default WallUnitProjectService;
