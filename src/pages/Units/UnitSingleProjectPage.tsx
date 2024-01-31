import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UnitProjectService from '../../services/UnitProjectService';
import SingleProjectHeader from './Headers/SingleProjectHeader';
import EditIcon from '../../components/icons/EditIcon';
import BinIcon from '../../components/icons/BinIcon';
import ResponsiveTable from '../../components/uiComp/tables/ResponsiveTable';

interface UnitSingleProjectPageParams {
    projectID: string;
}
function UnitSingleProjectPage() {
    const unitProjectService = new UnitProjectService();

    const params = useParams<{ token?: string; optionalParam?: string }>();
    const { projectID } = Object.assign({}, params) as UnitSingleProjectPageParams;

    const [projectDTO, setProjectDTO] = useState<UnitProjectDTO>();

    const [tableData, setTableData] = useState<{
        headers: string[];
        rows: Array<(string | JSX.Element)[]>;
    }>({ headers: [], rows: [] });

    const fetchData = async () => {
        if (!projectID) return; //TODO: redirect?
        try {
            var result = await unitProjectService.GetSingleProject<UnitProjectDTO>(projectID);

            console.log(result);
            if (result) {
                setProjectDTO(result);

                generateTableData(result.dimensions);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const generateTableData = (data: UnitProjectDimensionsModel[]) => {
        const updatedTableData = {
            headers: ['عنوان یونیت', 'توضیحات', 'عملیات'],
            rows: data.map((item) => [
                parseProjectUnitProps(item.properties).title,
                parseProjectUnitProps(item.properties).description,

                <div className="flex r2l justify-end lg:justify-center gap-6">
                    <button
                        onClick={() => {}}
                        className="text-sc-blue-normal rounded-lg hover:bg-sc-purple-normal">
                        <EditIcon />
                    </button>
                    <button
                        className="text-sc-red-normal rounded-lg hover:bg-sc-purple-normal"
                        onClick={() => {}}>
                        <BinIcon />
                    </button>
                </div>,
            ]),
        };
        setTableData(updatedTableData);
    };

    useEffect(() => {}, [tableData]);

    const parseProjectUnitProps = (prop: UnitProjectDimensionsPropsModel[]) => {
        let parseProp: UnitProjectDimensionPropParsed = { title: '', description: '' };

        prop.map((p) => {
            if (p.name === 'title') parseProp.title = p.value;

            if (p.name === 'description') parseProp.description = p.value;
        });

        return parseProp;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {projectDTO?.project && (
                <div className="flex flex-col gap-4 w-full font-peyda pb-16">
                    <SingleProjectHeader project={projectDTO.project} />
                    <div className="flex flex-col flex-grow overflow-y-auto">
                        <ResponsiveTable
                            data={tableData}
                            addIndex={true}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default UnitSingleProjectPage;
