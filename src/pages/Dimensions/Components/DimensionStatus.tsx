import { useState, useEffect } from 'react';
import { StatusEnum } from '../../../enums/StatusEnum';
import StatusChip from '../../../components/uiComp/chips/StatusChip';

interface DimensionStatusProps {
    dimension: any;
}

function DimensionStatus({ dimension }: DimensionStatusProps) {
    const [statusComponent, setStatusComponent] = useState<JSX.Element | null>(null);

    useEffect(() => {
        if (!dimension) return;

        if (dimension.isConfirmed) {
            if (dimension.sentForCut) {
                setStatusComponent(
                    <StatusChip
                        text="استفاده شده"
                        type={StatusEnum.Info}
                    />
                );
            } else if (dimension.isInUse) {
                setStatusComponent(
                    <StatusChip
                        text="در سبد خرید"
                        type={StatusEnum.Warning}
                    />
                );
            } else {
                setStatusComponent(
                    <StatusChip
                        text="محاسبه شده"
                        type={StatusEnum.Success}
                    />
                );
            }
        } else {
            if (dimension.isProccessing) {
                setStatusComponent(
                    <StatusChip
                        text="در حال محاسبه"
                        type={StatusEnum.Info}
                    />
                );
            } else {
                setStatusComponent(
                    <StatusChip
                        text="در حال ویرایش"
                        type={StatusEnum.Info}
                    />
                );
            }
        }
    }, [dimension]);

    return statusComponent;
}

export default DimensionStatus;
