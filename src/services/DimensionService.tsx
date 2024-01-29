import AxiosBase from './AxiosBase';

class DimensionService extends AxiosBase {
    public async GetWoodSheetDimensions<T>() {
        const url = 'Calculation/Dimension/WoodSheets';
        return this.request<T>({ method: 'get', url });
    }

    public async SaveNewCutDimension<T>(data: any) {
        const url = 'Calculation/Dimension/New';
        return this.request<T>({ method: 'post', url, data: data });
    }

    public async CopyFromCutDimension<T>(data: any, dimensionID: string) {
        const url = 'Calculation/Dimension/Copy/' + dimensionID;
        return this.request<T>({ method: 'post', url, data: data });
    }

    public async GetDimensionList<T>() {
        const url = 'Calculation/Dimension/List';
        return this.request<T>({ method: 'get', url });
    }

    public async GetDimensionHistoryList<T>() {
        const url = 'Calculation/Dimension/HistoryList';
        return this.request<T>({ method: 'get', url });
    }

    public async DeleteDimensionList<T>(dimensionID: string) {
        const url = 'Calculation/Dimension/delete?dimensionId=' + dimensionID;
        return this.request<T>({ method: 'delete', url });
    }

    public async GetDimensionDetails<T>(dimensionID: string, includeDimensions: boolean = false) {
        const url = 'Calculation/Dimension/Details/' + dimensionID + '?includeDimensions=' + includeDimensions;
        return this.request<T>({ method: 'get', url });
    }

    public async UpdateCutDimension<T>(data: any, dimensionID: string) {
        const url = 'Calculation/Dimension/edit/' + dimensionID;
        return this.request<T>({ method: 'put', url, data });
    }

    public async AddNewCutDimension<T>(data: any) {
        const url = 'Calculation/Dimension/addToTheList';
        return this.request<T>({ method: 'post', url, data });
    }

    public async DeleteFromDimensionCutList<T>(dimensionID: string, cutGuid: string) {
        const url = 'Calculation/Dimension/deleteFromList?dimensionId=' + dimensionID + '&listItemGuid=' + cutGuid;
        return this.request<T>({ method: 'delete', url });
    }

    public async CalculateDimensionList<T>(dimensionID: string) {
        const url = 'Calculation/Dimension/calculate?id=' + dimensionID;
        return this.request<T>({ method: 'get', url });
    }

    public async UploadOptiCutFile<T>(dimensionID: string, data: FormData) {
        const url = `Calculation/Dimension/ImportFromOpticut/${dimensionID}`;
        this.contentType = 'multipart/form-data';
        return this.request<T>({ method: 'put', url, data: data });
    }
}

export default DimensionService;
