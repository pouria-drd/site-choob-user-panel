import { useState } from "react";
import { ToastStatusEnum, useToast } from "../../components/uiComp/Toast/ToastProvider";

import Button from "../../components/uiComp/buttons/Button";
import DimensionService from "../../services/DimensionService";


const CopyCutDimension = ({ dimensionID, onSuccess }: { dimensionID: string, onSuccess: (copyDimensionId: string) => void }) => {
  const { showToast } = useToast();

  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    pvcColor: "",
    description: "",
    isNotRotatable: false,
    woodSheetDimensionsID: 1,
  });


  const dimensionService = new DimensionService();


  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };


  const handleCopyButtonClick = async () => {
    setIsProcessing(true);

    try {
      const result = await dimensionService.CopyFromCutDimension<any>(
        formData,
        dimensionID
      );
      showToast(result.message, ToastStatusEnum.Success);
      onSuccess(result.data);
    } catch (error) {
      let e = error as any;
      showToast(e.response.data.message, ToastStatusEnum.Error);
      setIsProcessing(false);
    }
  };


  return (
    <div className="flex flex-col gap-4">
      <input
        className="base-input"
        type="text"
        placeholder="عنوان"
        value={formData.title}
        maxLength={64}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <input
        className="base-input"
        type="text"
        placeholder="توضیحات"
        maxLength={100}
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
      <input
        className="base-input"
        type="text"
        placeholder="رنگ PVC مثال:همرنگ"
        maxLength={32}
        value={formData.pvcColor}
        onChange={(e) => handleInputChange("pvcColor", e.target.value)}
      />

      <Button
        text="کپی"
        onClick={handleCopyButtonClick}
        fullWidth={true}
        isDisabled={!formData.title}
        isBusy={isProcessing}
      />
    </div>
  );
};

export default CopyCutDimension;
