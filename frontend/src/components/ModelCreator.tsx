/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import FileUploader from "./StepByStepComponents/fileUploader";
import SelectFeatures from "./StepByStepComponents/SelectFeatures";


const ModelCreator = () => {
  const [firstStepGeneralAnalyse, setFirstStepGeneralAnalyse] = useState<any>(null);

  const handleFirstStepGeneralAnalyse = (data:any) => {
    setFirstStepGeneralAnalyse(data)
  }

  return (
    <div className="w-[85%] h-full p-4 bg-white">
      <FileUploader handleFirstStepGeneralAnalyse={handleFirstStepGeneralAnalyse} />
      {firstStepGeneralAnalyse && <SelectFeatures />}
    </div>
  );
};

export default ModelCreator;
