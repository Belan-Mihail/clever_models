/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import FileUploader from "./StepByStepComponents/fileUploader";
import SelectFeatures from "./StepByStepComponents/SelectFeatures";
import ErrorNotification from "./ErrorNotification";

const ModelCreator = () => {
  const [firstStepGeneralAnalyse, setFirstStepGeneralAnalyse] =
    useState<any>(null);
  const [error, setError] = useState<any>(null);

  const handleFirstStepGeneralAnalyse = (data: any) => {
    setFirstStepGeneralAnalyse(data);
  };

  return (
    <div className={`w-[85%] h-full p-4 bg-white`}>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        {error && <ErrorNotification error={error} setError={setError} />}
      </div>
    
      <FileUploader handleFirstStepGeneralAnalyse={handleFirstStepGeneralAnalyse} setError={setError} />
      
      {firstStepGeneralAnalyse && (<SelectFeatures firstStepGeneralAnalyse={firstStepGeneralAnalyse} setError={setError} />)}
    </div>
  );
};

export default ModelCreator;
