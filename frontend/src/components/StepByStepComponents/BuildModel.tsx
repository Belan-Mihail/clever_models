import React from "react";
import SelectXFeatures from "./BuildModelSubComponents/SelectXFeatures";
import SelectTargetVariable from "./BuildModelSubComponents/SelectTargetVariable";
import SelectModel from "./BuildModelSubComponents/SelectModel";
import FinalCheck from "./BuildModelSubComponents/FinalCheck";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  setCurrentStep,
  setXFeatures,
  setYFeatures,
  setSelectedModel,
  setTestSize,
} from "../../store/slices/modelSlice";

interface BuildModelProps {
  firstStepGeneralAnalyse: FirstStepAnalyse;
  error: any;
  loading: boolean;
  response: string | null;
  handleTrainModel: (data: any) => void;
  setResponse: (data: string | null) => void;
}

const BuildModel: React.FC<BuildModelProps> = ({
  firstStepGeneralAnalyse,
  error,
  loading,
  response,
  handleTrainModel,
  setResponse,
}) => {
  const dispatch = useAppDispatch();

  const currentStep = useAppSelector((state) => state.model.currentStep);
  const xFeatures = useAppSelector((state) => state.model.xFeatures);
  const yFeatures = useAppSelector((state) => state.model.yFeatures);
  const selectedModel = useAppSelector((state) => state.model.selectedModel);
  const testSize = useAppSelector((state) => state.model.testSize);

  if (
    !firstStepGeneralAnalyse ||
    !Array.isArray(firstStepGeneralAnalyse.columns) ||
    !Array.isArray(firstStepGeneralAnalyse.columns_type)
  ) {
    return <div className="text-center text-sm text-gray-500 p-4">Loading data...</div>;
  }

  return (
    <div>
      {currentStep === 0 && (
        <SelectXFeatures
          setCurrentStep={(step) => dispatch(setCurrentStep(step))}
          firstStepGeneralAnalyse={firstStepGeneralAnalyse}
          xFeatures={xFeatures}
          handleXFeatures={(features) => dispatch(setXFeatures(features))}
        />
      )}
      {currentStep === 1 && (
        <SelectTargetVariable
          setCurrentStep={(step) => dispatch(setCurrentStep(step))}
          firstStepGeneralAnalyse={firstStepGeneralAnalyse}
          yFeatures={yFeatures}
          xFeatures={xFeatures}
          handleYFeatures={(feature) => dispatch(setYFeatures(feature))}
        />
      )}
      {currentStep === 2 && (
        <SelectModel
          setCurrentStep={(step) => dispatch(setCurrentStep(step))}
          yFeatures={yFeatures}
          xFeatures={xFeatures}
          selectedModel={selectedModel}
          setSelectedModel={(model) => dispatch(setSelectedModel(model))}
          testSize={testSize}
          setTestSize={(size) => dispatch(setTestSize(size))}
        />
      )}
      {currentStep === 3 && (
        <FinalCheck
          yFeatures={yFeatures}
          xFeatures={xFeatures}
          selectedModel={selectedModel}
          testSize={testSize}
          handleTrainModel={handleTrainModel}
          loading={loading}
          response={response}
          error={error}
        />
      )}
    </div>
  );
};

export default BuildModel;
