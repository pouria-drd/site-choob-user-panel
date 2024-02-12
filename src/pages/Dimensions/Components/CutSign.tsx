import { useEffect, useState } from 'react';
import Modal from '../../../components/uiComp/modals/Modal';

import woodSheetGrain from '../../../assets/images/woodsheetgrain.png';
import CutSideSign from '../../../contents/dimensions/CutSideSign';

interface SignProps {
    name: string;
    title: string;
    index: number;
    specialSign: boolean;
}

interface CutSignProp {
    dimension: DimensionCutModel;
    onUpdate: (data: DimensionCutModel) => void;
}
interface SignModalProp {
    title: string;
    type: string;
    selectedIndex: number;
}
const CutSign = ({ dimension }: CutSignProp) => {
    const defaultSigns: SignProps[] = [
        {
            name: 'none',
            title: 'بدون علامت',
            index: 0,
            specialSign: false,
        },
        {
            name: 'pvc',
            title: 'نوار PVC',
            index: 1,
            specialSign: false,
        },
        {
            name: 'groove',
            title: 'شیار',
            index: 2,
            specialSign: true,
        },
        {
            name: 'gazor',
            title: 'گازور',
            index: 3,
            specialSign: true,
        },
        {
            name: 'farsi',
            title: 'فارسی',
            index: 4,
            specialSign: false,
        },
        {
            name: 'pvcGroove',
            title: 'نوار شیار',
            index: 5,
            specialSign: true,
        },
        {
            name: 'pvcGazor',
            title: 'نوار گازور',
            index: 6,
            specialSign: true,
        },
    ];
    const [modalType, setModalType] = useState<SignModalProp>({ title: '', type: '', selectedIndex: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [signs, setSigns] = useState<SignProps[]>([]);
    const [planeDimension, setPlaceDimension] = useState('w-20 h-20 md:w-24 md:h-24');
    const [top, setTop] = useState<SignProps>(defaultSigns[0]);
    const [left, setLeft] = useState<SignProps>(defaultSigns[0]);
    const [right, setRight] = useState<SignProps>(defaultSigns[0]);
    const [bottom, setBottom] = useState<SignProps>(defaultSigns[0]);

    const [dto, setDTO] = useState<DimensionCutModel>(dimension);

    const closeModal = () => setIsModalOpen(false);
    const closeOnUpdate = (type: string, sign: SignProps) => {
        setIsModalOpen(false);
        switch (type) {
            case 'top':
                setTop(sign);
                break;
            case 'bottom':
                setBottom(sign);
                break;
            case 'right':
                setRight(sign);
                break;
            case 'left':
                setLeft(sign);
                break;
        }
    };

    const calculatePlaneDimension = () => {
        const x = dimension.x;
        const y = dimension.y;
        const offsetMargin = 8;

        //Y is bigger
        if (x - y + offsetMargin < 0) {
            console.log('y is bigger');
            setPlaceDimension('w-20 h-24 md:w-24 md:h-28');
        }
        //X is bigger
        else if (y - x + offsetMargin < 0) {
            console.log('x is bigger');
            setPlaceDimension('w-24 h-20 md:w-28 md:h-24');
        } else {
            setPlaceDimension('w-20 h-20 md:w-24 md:h-24');
        }
    };

    const openModal = (type: string, title: string, selectedIndex: number, showSpecialSigns: boolean) => {
        const titleBegin = 'علامت لبه ';
        setSigns(defaultSigns.filter((x) => x.specialSign === false || x.specialSign === showSpecialSigns));

        setModalType({ title: titleBegin + title, type: type, selectedIndex: selectedIndex });
        setIsModalOpen(true);
    };

    useEffect(() => {
        console.log('handle t');
        handleTopSign();
    }, [top]);

    useEffect(() => {
        console.log('handle b');
        handleBottomSign();
    }, [bottom]);

    useEffect(() => {
        console.log('handle r');
        handleRightSign();
    }, [right]);

    useEffect(() => {
        handleLeftSign();
    }, [left]);

    const handleTopSign = () => {
        const topSign = top.name;
        let modDTO: DimensionCutModel = dto;

        //set them all to false first..
        Object.keys(modDTO).forEach((key: string) => {
            if (typeof modDTO[key as keyof DimensionCutModel] === 'boolean') {
                if (key.toLowerCase().endsWith('top')) (modDTO as any)[key] = false;
            }
        });

        if (topSign === 'pvc') modDTO.pvctop = true;

        if (topSign === 'farsi') modDTO.fTop = true;

        setDTO(modDTO);
    };
    const handleRightSign = () => {
        const topSign = right.name;
        let modDTO: DimensionCutModel = dto;

        //set them all to false first..
        Object.keys(modDTO).forEach((key: string) => {
            if (typeof modDTO[key as keyof DimensionCutModel] === 'boolean') {
                if (key.toLowerCase().endsWith('right')) (modDTO as any)[key] = false;
            }
        });

        if (topSign === 'pvc') modDTO.pvcright = true;

        if (topSign === 'farsi') modDTO.fRight = true;

        setDTO(modDTO);
    };
    const handleBottomSign = () => {
        const topSign = bottom.name;
        let modDTO: DimensionCutModel = dto;

        //set them all to false first..
        Object.keys(modDTO).forEach((key: string) => {
            if (typeof modDTO[key as keyof DimensionCutModel] === 'boolean') {
                if (key.toLowerCase().endsWith('bottom') || key.toLocaleLowerCase() === 'xgazor' || key.toLocaleLowerCase() === 'xgroove') (modDTO as any)[key] = false;
            }
        });

        if (topSign === 'pvc') modDTO.pvcbottom = true;

        if (topSign === 'farsi') modDTO.fBottom = true;

        if (topSign === 'groove') modDTO.xGroove = true;

        if (topSign === 'gazor') modDTO.xGazor = true;

        if (topSign === 'pvcGroove') {
            modDTO.xGroove = true;
            modDTO.pvcbottom = true;
        }
        if (topSign === 'pvcGazor') {
            modDTO.xGazor = true;
            modDTO.pvcbottom = true;
        }

        setDTO(modDTO);
    };
    const handleLeftSign = () => {
        const topSign = left.name;
        let modDTO: DimensionCutModel = dto;

        //set them all to false first..
        Object.keys(modDTO).forEach((key: string) => {
            if (typeof modDTO[key as keyof DimensionCutModel] === 'boolean') {
                if (key.toLowerCase().endsWith('left') || key.toLocaleLowerCase() === 'ygazor' || key.toLocaleLowerCase() === 'ygroove') (modDTO as any)[key] = false;
            }
        });

        if (topSign === 'pvc') modDTO.pvcleft = true;

        if (topSign === 'farsi') modDTO.fLeft = true;

        if (topSign === 'groove') modDTO.yGroove = true;

        if (topSign === 'gazor') modDTO.yGazor = true;

        if (topSign === 'pvcGroove') {
            modDTO.yGroove = true;
            modDTO.pvcleft = true;
        }
        if (topSign === 'pvcGazor') {
            modDTO.yGazor = true;
            modDTO.pvcleft = true;
        }

        setDTO(modDTO);
    };

    /*const setDefaultTop = () => {
        console.log('1213');
        console.log(dimension);
        if (dimension.pvctop) {
            setTop(findSignProp('pvc'));
        } else if (dimension.fTop) {
            setTop(findSignProp('farsi'));
        } else {
            setTop(findSignProp('none'));
        }
    };

    const findSignProp = (name: string) => {
        return defaultSigns.filter((x) => x.name === name)[0];
    };*/
    useEffect(() => {
        setDTO(dimension);
        calculatePlaneDimension();

        if (dimension.x === 0 && dimension.y === 0) {
            setTop(defaultSigns[0]);
            setLeft(defaultSigns[0]);
            setBottom(defaultSigns[0]);
            setRight(defaultSigns[0]);
        }
    }, [dimension]);

    return (
        <>
            <div className="flex  items-center justify-center p-2 w-full md:w-fit  border rounded r2l">
                <div className="flex items-center justify-center ">
                    <button
                        className="text-xs sm:text-base rounded-md bg-sc-purple-normal px-2 py-1 w-20 md:w-24"
                        onClick={() => openModal('right', 'راست', right.index, false)}>
                        {right.title}
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center ">
                    <button
                        className="text-xs sm:text-base rounded-md bg-sc-purple-normal px-2 py-1 w-20 md:w-24"
                        onClick={() => openModal('top', 'بالا', top.index, false)}>
                        {top.title}
                    </button>
                    <div className="flex justify-center p-2">
                        <div className={`relative  bg-white  border border-gray-400  z-20 ${planeDimension}`}>
                            <div
                                className="absolute w-full h-full z-0 bg-contain opacity-10  bg-repeatx"
                                style={{ backgroundImage: `url(${woodSheetGrain})` }}
                            />

                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2  text-center z-20">
                                <span className="text-xs">{dimension.x == 0 ? '' : dimension.x}</span>
                            </div>

                            <div className="absolute top-1/2 transform -translate-y-1/2 mr-2 right-0 text-center z-20">
                                <span className="text-xs">{dimension.y == 0 ? '' : dimension.y}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        className="text-xs sm:text-base rounded-md bg-sc-purple-normal px-2 py-1  w-20 md:w-24"
                        onClick={() => openModal('bottom', 'پایین', bottom.index, true)}>
                        {bottom.title}
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="text-xs sm:text-base rounded-md bg-sc-purple-normal px-2 py-1  w-20 md:w-24"
                        onClick={() => openModal('left', 'چپ', left.index, true)}>
                        {left.title}
                    </button>
                </div>
            </div>

            <Modal
                title={modalType.title}
                isOpen={isModalOpen}
                onClose={closeModal}>
                <CutSideSign
                    selectedValueIndex={modalType.selectedIndex}
                    type={modalType.type}
                    signs={signs}
                    onSelection={(t, s) => closeOnUpdate(t, s)}
                />
            </Modal>
        </>
    );
};

export default CutSign;
