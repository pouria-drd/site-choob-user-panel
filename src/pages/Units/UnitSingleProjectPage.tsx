import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface UnitSingleProjectPageParams {
    projectID: string;
}
function UnitSingleProjectPage() {
    const params = useParams<{ token?: string; optionalParam?: string }>();
    const { projectID } = Object.assign({}, params) as UnitSingleProjectPageParams;

    useEffect(() => {
        console.log(projectID);
    }, []);

    return <>{projectID}</>;
}

export default UnitSingleProjectPage;
