import AxiosBase from './AxiosBase';

class UnitProjectService extends AxiosBase {
    protected baseURL: string = 'UnitProject/';

    public async CreateNewUnitProject<T>(data: any) {
        const url = this.baseURL + 'NewProject';
        return this.request<T>({ method: 'post', url: url, data: data });
    }

    public async GetUserProperties<T>() {
        const url = this.baseURL + 'UserProperties';
        return this.request<T>({ method: 'get', url });
    }

    public async UpdateProperties<T>(propIndex: number, newValue: number) {
        const url = this.baseURL + 'UserProperties/Update?' + `propIndex=${propIndex}&newValue=${newValue}`;
        return this.request<T>({ method: 'put', url });
    }

    public async DeleteProject<T>(projectId: string) {
        const url = this.baseURL + `DeleteProject?projectId=${projectId}`;
        return this.request<T>({ method: 'delete', url: url });
    }

    public async GetProjectsList<T>() {
        const url = this.baseURL + 'List';
        return this.request<T>({ method: 'get', url });
    }

    public async GetSingleProject<T>(projectId: string, includeDimensions: boolean = true) {
        const url = this.baseURL + 'Project/' + projectId + `?includeDimensions=${includeDimensions == true ? 'true' : 'false'}`;
        return this.request<T>({ method: 'get', url });
    }

    public async GetProjectUnits<T>(projectId: string) {
        const url = this.baseURL + 'Project/Units/' + projectId;
        return this.request<T>({ method: 'get', url });
    }

    public async GetUnits<T>() {
        const url = this.baseURL + 'UnitList';
        return this.request<T>({ method: 'get', url });
    }

    public async CalculatedSimpleGroundUnit<T>(dto: SimpleGroundUnitDTO) {
        const url = this.baseURL + 'GroundUnit/New';
        return this.request<T>({ method: 'post', url, data: dto });
    }
}

export default UnitProjectService;
