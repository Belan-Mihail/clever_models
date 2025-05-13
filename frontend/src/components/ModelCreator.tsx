/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import FileUploader from "./StepByStepComponents/fileUploader";
import SelectFeatures from "./StepByStepComponents/SelectFeatures";
import ErrorNotification from "./ErrorNotification";

const ModelCreator = () => {

  // general states and function
   const [error, setError] = useState<any>(null);
   const [activeComponent, setActiveComponent] = useState("")

   useEffect(() => {
    setActiveComponent("FileUploader")

   }, [])
   

   // general anlyse file after upload (validation file)- return: object columns, column_type, rows_counr
  const [firstStepGeneralAnalyse, setFirstStepGeneralAnalyse] = useState<any>(null);

  const handleFirstStepGeneralAnalyse = (data: any) => {
    setFirstStepGeneralAnalyse(data);
  };

  // user choose fetureas from column and send it to ML. return:
  const [xFeatures, setXFeatures] = useState<any>(null);
  const [yFeatures, setYFeatures] = useState<any>(null);

  const handleXFeatures = (data: any) => {
    setXFeatures(data);
  };

  const handleYFeatures = (data: any) => {
    setYFeatures(data);
  };

  return (
    <div className={`w-[85%] h-full p-4 bg-white`}>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        {error && <ErrorNotification error={error} setError={setError} />}
      </div>
    
      {activeComponent=="FileUploader" && <FileUploader handleFirstStepGeneralAnalyse={handleFirstStepGeneralAnalyse} setError={setError} setActiveComponent={setActiveComponent} />}
      
      {activeComponent=="SelectFeatures" && (<SelectFeatures firstStepGeneralAnalyse={firstStepGeneralAnalyse} setError={setError} setActiveComponent={setActiveComponent} handleXFeatures={handleXFeatures} handleYFeatures={handleYFeatures} />)}
    
    </div>
  );
};

export default ModelCreator;
