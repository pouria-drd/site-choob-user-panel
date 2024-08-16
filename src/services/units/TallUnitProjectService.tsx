import UnitProjectBase from './UnitProjectBase';

class TallUnitProjectService extends UnitProjectBase {
    protected baseURL: string = 'UnitProject/';

    public async CalculateSimpleTallUnit<T>(dto: SimpleTallUnitDTO) {
        const url = this.baseURL + 'SimpleTallUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }
}

export default TallUnitProjectService;
