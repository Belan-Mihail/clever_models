import React, { useState } from "react";
import SelectXFeatures from "./BuildModelSubComponents/SelectXFeatures";
import SelectTargetVariable from "./BuildModelSubComponents/SelectTargetVariable";
import SelectModel from "./BuildModelSubComponents/SelectModel";
import FinalCheck from "./BuildModelSubComponents/FinalCheck";

export interface FirstStepAnalyse {
  columns: string[];
  columns_type: string[];
  rows_count: number;
}

interface BuildModelProps {
  firstStepGeneralAnalyse: FirstStepAnalyse;
  setError: (data: any) => void;
  setActiveComponent: (componentName: string) => void;
  handleXFeatures: (features: string[]) => void;
  handleYFeatures: (features: string) => void;
  xFeatures: string[];
  yFeatures: string;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  testSize: number;
  setTestSize: (value: number) => void;
  loading: boolean,
  setLoading: (data:boolean) => void,
  response: string | null,
  setResponse: (data:string | null) => void,
  handleTrainModel: (data:any) => void,
}

const BuildModel: React.FC<BuildModelProps> = ({
  firstStepGeneralAnalyse,
  setError,
  setActiveComponent,
  handleXFeatures,
  handleYFeatures,
  xFeatures,
  yFeatures,
  selectedModel,
  setSelectedModel,
  testSize,
  setTestSize,
  loading,
  setLoading,
  response,
  setResponse,
  handleTrainModel,
  
}) => {
  const [currentStep, setCurrentStep] = useState(0);

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
      {currentStep === 0 && (
        <SelectXFeatures
          setCurrentStep={setCurrentStep}
          firstStepGeneralAnalyse={firstStepGeneralAnalyse}
          xFeatures={xFeatures}
          handleXFeatures={handleXFeatures}
        />
      )}
      {currentStep === 1 && (
        <SelectTargetVariable
          setCurrentStep={setCurrentStep}
          firstStepGeneralAnalyse={firstStepGeneralAnalyse}
          yFeatures={yFeatures}
          xFeatures={xFeatures}
          handleYFeatures={handleYFeatures}
        />
      )}
      {currentStep === 2 && (
        <SelectModel
          setCurrentStep={setCurrentStep}
          yFeatures={yFeatures}
          xFeatures={xFeatures}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          testSize={testSize}
          setTestSize={setTestSize}
        />
      )}
      {currentStep === 3 && (
        <FinalCheck 
          yFeatures={yFeatures}
          xFeatures={xFeatures}
          selectedModel={selectedModel}
          testSize={testSize}
          handleTrainModel={handleTrainModel}
        />
        )}
    </div>
  );
};

export default BuildModel;
