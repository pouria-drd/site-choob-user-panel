import { useEffect, useState } from 'react';

import UnitSetting from './Components/UnitSetting';
import AlertIcon from '../../components/icons/AlertIcon';
import Spinner from '../../components/uiComp/spinner/Spinner';
import UnitProjectService from '../../services/UnitProjectService';

function UnitSettingsPage() {
    const unitProjectService = new UnitProjectService();

    const [isLoading, setIsLoading] = useState(true);

    const [projectProps, setProjectProps] = useState<UnitProjectPropsModel[]>([]);

    const fetchProjectProps = async () => {
        setIsLoading(true);
        try {
            const result = await unitProjectService.GetUserProperties<UnitProjectPropertiesModel>();

            console.log(result);
            if (result) {
                setProjectProps(result.properties);
            }
        } catch (e) {
            console.log(e);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        fetchProjectProps();
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner flex={true} />
            ) : (
                <div className="flex flex-col gap-4 w-full font-peyda pb-16 r2l">
                    <h1 className="font-bold text-right text-lg md:text-xl">تنظیمات پروژه</h1>

                    <div className="flex items-center w-full sm:w-fit rounded-lg text-sc-brown-800 bg-sc-brown-500 border border-sc-orange-normal gap-2 p-4 r2l">
                        <span className="hidden sm:block">
                            <AlertIcon />
                        </span>

                        <p>سیستم محاسبه سایت چوب از مقادیر زیر برای محاسبه یونیت های شما استفاده خواهد کرد. شما می توانید آن ها را به نسبت نیاز خود تغییر دهید.</p>
                    </div>
                    <div className="grid gird-cols-1  md:grid-cols-4 h-full r2l gap-4 px-0">
                        {projectProps.map((p) => (
                            <UnitSetting
                                data={p}
                                key={p.index}
                                onUpdate={fetchProjectProps}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default UnitSettingsPage;
