import { useState } from 'react';

import Button from '../../../components/uiComp/buttons/Button';
import Modal from '../../../components/uiComp/modals/Modal';
import NewProjectContent from '../../../contents/UnitProject/NewProjectContent';

function NewProjectHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="flex justify-between gap-3">
                <div className="flex w-fit justify-end">
                    <Button
                        text="پروژه جدید"
                        onClick={() => openModal()}
                    />
                </div>
                <h2 className="text-lg md:text-xl text-right font-semibold">پروژه یونیت</h2>
            </div>

            <Modal
                title="ایجاد پروژه جدید"
                isOpen={isModalOpen}
                onClose={closeModal}>
                <NewProjectContent />
            </Modal>
        </>
    );
}

export default NewProjectHeader;
