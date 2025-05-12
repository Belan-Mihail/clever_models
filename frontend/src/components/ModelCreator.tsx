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
    <div className="w-[85%] h-full p-4 bg-white">

      {error && <ErrorNotification error={error} setError={setError} />}

      <FileUploader handleFirstStepGeneralAnalyse={handleFirstStepGeneralAnalyse} setError={setError} />
      
      {firstStepGeneralAnalyse && (<SelectFeatures firstStepGeneralAnalyse={firstStepGeneralAnalyse} setError={setError} />)}
      
    </div>
  );
};

export default ModelCreator;
