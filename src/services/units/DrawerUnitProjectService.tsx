import UnitProjectBase from './UnitProjectBase';

class DrawerUnitProjectService extends UnitProjectBase {
    protected baseURL: string = 'UnitProject/';

    public async CalculateSimpleDrawerUnit<T>(dto: SimpleDrawerUnitDTO) {
        const url = this.baseURL + 'SimpleDrawerUnit?isOpen=false';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculateOpenDrawerUnit<T>(dto: SimpleDrawerUnitDTO) {
        const url = this.baseURL + 'SimpleDrawerUnit?isOpen=true';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculateHiddenHandleDrawerUnit<T>(dto: HiddenHandleDrawerUnitDTO) {
        const url = this.baseURL + 'HiddenHandleDrawerUnit?isOpen=false';
        return this.request<T>({ method: 'post', url, data: dto });
    }

    public async CalculateHiddenHandleOpenDrawerUnit<T>(dto: HiddenHandleDrawerUnitDTO) {
        const url = this.baseURL + 'HiddenHandleDrawerUnit?isOpen=true';
        return this.request<T>({ method: 'post', url, data: dto });
    }
}

export default DrawerUnitProjectService;
