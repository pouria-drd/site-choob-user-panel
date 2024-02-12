import UnitProjectBase from './UnitProjectBase';

class DrawerUnitProjectService extends UnitProjectBase {
    protected baseURL: string = 'UnitProject/';

    public async CalculateSimpleDrawerUnit<T>(dto: SimpleDrawerUnitDTO) {
        const url = this.baseURL + 'SimpleDrawerUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculateHiddenHandleDrawerUnit<T>(dto: HiddenHandleDrawerUnitDTO) {
        const url = this.baseURL + 'HiddenHandleDrawerUnit';
        return this.request<T>({ method: 'post', url, data: dto });
    }
}

export default DrawerUnitProjectService;
