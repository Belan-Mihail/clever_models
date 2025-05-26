import React from "react";
import SelectXFeatures from "./BuildModelSubComponents/SelectXFeatures";
import SelectTargetVariable from "./BuildModelSubComponents/SelectTargetVariable";
import SelectModel from "./BuildModelSubComponents/SelectModel";
import FinalCheck from "./BuildModelSubComponents/FinalCheck";
import ModelReview from "./BuildModelSubComponents/ModelReview";

import { useAppSelector } from "../../store/hooks";

const BuildModel: React.FC = () => {
  const { currentStep, firstStepGeneralAnalyse } = useAppSelector(
    (state) => state.model
  );

  if (
    !firstStepGeneralAnalyse ||
    !Array.isArray(firstStepGeneralAnalyse.columns) ||
    !Array.isArray(firstStepGeneralAnalyse.columns_type)
  ) {
    return (
      <div className="text-center text-sm text-gray-500 p-4">
        Loading data...
      </div>
    );
  }

  return (
    <div>
      {currentStep === 0 && <SelectXFeatures />}
      {currentStep === 1 && <SelectTargetVariable />}
      {currentStep === 2 && <SelectModel />}
      {currentStep === 3 && <FinalCheck />}
      {currentStep === 4 && <ModelReview />}
    </div>
  );
};

export default BuildModel;
