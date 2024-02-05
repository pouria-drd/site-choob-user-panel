import AxiosBase from '../AxiosBase';

class UnitProjectBase extends AxiosBase {
    protected baseURL: string = 'UnitProject/';

    public async AddUnitToProject<T>(dto: AddUnitDTO) {
        const url = this.baseURL + 'AddUnitToProject';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    //Calculate unit Stuff
    public async CalculatedSimpleWallUnit<T>(dto: SimpleWallUnitDTO) {
        const url = this.baseURL + 'SimpleWallUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }
}

export default UnitProjectBase;
