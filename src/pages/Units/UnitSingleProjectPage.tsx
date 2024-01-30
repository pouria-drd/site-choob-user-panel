import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UnitProjectService from '../../services/UnitProjectService';
import SingleProjectHeader from './Headers/SingleProjectHeader';

interface UnitSingleProjectPageParams {
    projectID: string;
}
function UnitSingleProjectPage() {
    const unitProjectService = new UnitProjectService();

    const params = useParams<{ token?: string; optionalParam?: string }>();
    const { projectID } = Object.assign({}, params) as UnitSingleProjectPageParams;

    const [projectDTO, setProjectDTO] = useState<UnitProjectDTO>();

    const fetchData = async () => {
        if (!projectID) return; //TODO: redirect?
        try {
            var result = await unitProjectService.GetSingleProject<UnitProjectDTO>(projectID);

            console.log(result);
            if (result) {
                setProjectDTO(result);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <>{projectDTO?.project && <SingleProjectHeader project={projectDTO.project} />}</>;
}

export default UnitSingleProjectPage;
