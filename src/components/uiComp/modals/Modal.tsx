import { ReactNode } from 'react';
import ModalBackDrop from './ModalBackDrop';
import CloseIcon from '../../icons/CloseIcon';

interface NewCutModalProps {
    title: string;
    isOpen: boolean;
    children: ReactNode;
    onClose: () => void;
}

const Modal = ({ title, isOpen, children, onClose }: NewCutModalProps) => {
    return (
        <>
            {isOpen && (
                <ModalBackDrop onClose={onClose}>
                    <div className="bg-white flex flex-col items-center justify-start rounded-lg relative z-20 w-[90vw] sm:w-[90vw] md:w-auto min-w-[340px] max-h-[80vh] mx-auto p-6 gap-4 ">
                        <div className="flex items-center justify-between w-full l2r">
                            <span
                                className="cursor-pointer text-sc-purple-400 hover:text-gray-400"
                                onClick={onClose}>
                                <CloseIcon size={12} />
                            </span>
                            <h2 className="font-bold r2l">{title}</h2>
                        </div>

                        <div className="w-full overflow-y-auto overflow-x-hidden p-2">{children}</div>
                    </div>
                </ModalBackDrop>
            )}
        </>
    );
};

export default Modal;
