/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import FileUploader from "./StepByStepComponents/FileUploader";
import BuildModel from "./StepByStepComponents/BuildModel";
import ErrorNotification from "./ErrorNotification";

const ModelCreator = () => {
  // general states and function
  const [error, setError] = useState<any>(null);
  const [activeComponent, setActiveComponent] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    setActiveComponent("FileUploader");
  }, []);

  // general anlyse file after upload (validation file)- return: object columns, column_type, rows_counr
  const [firstStepGeneralAnalyse, setFirstStepGeneralAnalyse] =
    useState<any>(null);

  const handleFirstStepGeneralAnalyse = (data: any) => {
    setFirstStepGeneralAnalyse(data);
  };

  // user choose fetureas from column and send it to ML. return:
  const [xFeatures, setXFeatures] = useState<string[]>([]);
  const [yFeatures, setYFeatures] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [testSize, setTestSize] = useState<number>(0.2);

  const handleXFeatures = (data: any) => {
    setXFeatures(data);
  };

  const handleYFeatures = (data: any) => {
    setYFeatures(data);
  };

  // general anlyse file after upload (validation file)- return: object columns, column_type, rows_counr
  const [onTrainModelResult, setOnTrainModelResult] =
    useState<any>(null);

  const handleTrainModelResult = (data: any) => {
    setOnTrainModelResult(data);
  };

  const handleTrainModel = async (xFeatures:string[], yFeatures:string, selectedModel:string, testSize:number) => {
    setLoading(true);
    setError(null);
    setResponse('');

    const formData = new FormData();
    formData.append("xFeatures", JSON.stringify(xFeatures));
    formData.append("yFeatures", yFeatures);
    formData.append("selectedModel", selectedModel);
    formData.append("testSize", testSize.toString());

    try {
      const res = await fetch("http://127.0.0.1:5000/api/select_columns", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.status === "ok") {
        setOnTrainModelResult(data.result);
        
      } else {
        setResponse("Fail upload");
        setError("unexpected file type")
      }
    } catch (err) {
      setResponse("Fail upload");
      setError(err)
      console.log(err);
    } finally {
      setLoading(false);
    }
  } 

  return (
    <div className={`w-[85%] h-full p-4 bg-white`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        {error && <ErrorNotification error={error} setError={setError} />}
      </div>

      {activeComponent == "FileUploader" && (
        <FileUploader
          handleFirstStepGeneralAnalyse={handleFirstStepGeneralAnalyse}
          setError={setError}
          setActiveComponent={setActiveComponent}
          loading={loading}
          setLoading={setLoading}
          response={response}
          setResponse={setResponse}
        />
      )}

      {activeComponent == "BuildModel" && (
        <BuildModel
          firstStepGeneralAnalyse={firstStepGeneralAnalyse}
          setError={setError}
          setActiveComponent={setActiveComponent}
          handleXFeatures={handleXFeatures}
          handleYFeatures={handleYFeatures}
          xFeatures={xFeatures}
          yFeatures={yFeatures}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          testSize={testSize}
          setTestSize={setTestSize}
          loading={loading}
          setLoading={setLoading}
          response={response}
          setResponse={setResponse}
          handleTrainModel={handleTrainModel}
        />
      )}
    </div>
  );
};

export default ModelCreator;
