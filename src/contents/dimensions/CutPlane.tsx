import { useEffect, useState } from "react";

const CutPlane = ({ dimension }: { dimension: DimensionCutModel }) => {
  // Use state to store the dimension and trigger re-renders
  const [currentDimension, setCurrentDimension] = useState<DimensionCutModel>(
    () => dimension
  );

  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [bottom, setBottom] = useState("");

  const handleSigns = () => {
    setTop(checkProps(dimension.pvctop, false, false));
    setRight(checkProps(dimension.pvcright, false, false));
    setLeft(checkProps(dimension.pvcleft, dimension.yGroove, dimension.yGazor));
    setBottom(
      checkProps(dimension.pvcbottom, dimension.xGroove, dimension.xGazor)
    );
  };

  const checkProps = (pvc: boolean, groove: boolean, gazor: boolean) => {
    let returnString = "";

    if (pvc) {
      if (groove) {
        returnString = "نوار شیار";
      } else if (gazor) {
        returnString = "نوار گازور";
      } else {
        returnString = "نوار";
      }
    } else {
      if (groove) {
        returnString = "شیار";
      } else if (gazor) {
        returnString = "گازور";
      }
    }

    return returnString;
  };

  useEffect(() => {
    // Update state when the prop changes
    setCurrentDimension((prevDimension) => {
      if (dimension.x !== undefined && dimension.y !== undefined) {
        return dimension;
      }
      return prevDimension;
    });

    handleSigns();
  }, [dimension]);

  return (
    <div className="flex justify-center p-4">
      <div
        className={`relative bg-white border border-gray-400  z-20 ${currentDimension.x === currentDimension.y
          ? "w-20 h-20"
          : currentDimension.x ?? 20 > (currentDimension.y ?? 10)
            ? "w-20 h-16"
            : "w-16 h-20"
          }`}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2  text-center">
          <span className="text-xs">
            {currentDimension.x == 0 ? "" : currentDimension.x}
          </span>
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 mr-2 right-0 text-center">
          <span className="text-xs">
            {currentDimension.y == 0 ? "" : currentDimension.y}
          </span>
        </div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-6 text-center">
          <span className="text-xs">{top}</span>
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 -ml-7 left-0 text-center">
          <span className="text-xs r2l">{left}</span>
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 -mr-7 right-0 text-center">
          <span className="text-xs">{right}</span>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 text-center">
          <span className="text-xs whitespace-nowrap">{bottom}</span>
        </div>
      </div>
    </div>
  );
};

export default CutPlane;
