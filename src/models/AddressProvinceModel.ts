interface ProvinceModel {
    id: number;
    name: string;
    cities: CityModel[];
}

interface CityModel {
    id: number;
    name: string;
    districts: DistrictsModel[];
}

interface DistrictsModel {
    number: number;
    childs: DistrctChild[];
}

interface DistrctChild {
    id: number;
    name: string;
}
