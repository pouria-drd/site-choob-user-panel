import AxiosBase from './AxiosBase';

class UnitProjectService extends AxiosBase {
    protected baseURL: string = 'UnitProject/';

    public async CreateNewUnitProject<T>(data: any) {
        const url = this.baseURL + 'NewProject';
        return this.request<T>({ method: 'post', url: url, data: data });
    }

    public async DeleteProject<T>(projectId: string) {
        const url = this.baseURL + `DeleteProject?projectId=${projectId}`;
        return this.request<T>({ method: 'delete', url: url });
    }

    public async GetProjectsList<T>() {
        const url = this.baseURL + 'List';
        return this.request<T>({ method: 'get', url });
    }
}

export default UnitProjectService;
