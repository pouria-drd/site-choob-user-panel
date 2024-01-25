import { useState } from "react";
import UserIcon from "../components/icons/UserIcon";
import CalculatorIcon from "../components/icons/CalculatorIcon";
import NewCutContent from "../contents/dimensions/NewCutContent";

import Modal from "../components/uiComp/modals/Modal";
import Shortcut from "../components/uiComp/shortcuts/Shortcut";
import HomeShortcut from "../components/uiComp/shortcuts/HomeShortcut";
import EventShortcut from "../components/uiComp/shortcuts/EventShortcut";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col divide-y divide-gray-300 font-peyda h-full p-4 gap-6">
      <HomeShortcut label="حساب کاربری">
        <Shortcut
          text="پروفایل"
          to="user/profile"
          icon={<UserIcon />}
          isInApp={false}
        />
      </HomeShortcut>

      <HomeShortcut label="محاسبات">
        <EventShortcut
          text="تعریف ابعاد جدید"
          icon={<CalculatorIcon />}
          event={openModal}
        />
      </HomeShortcut>

      <Modal title="تعریف ابعاد جدید" isOpen={isModalOpen} onClose={closeModal}>
        <NewCutContent />
      </Modal>
    </div>
  );
}

export default Home;
