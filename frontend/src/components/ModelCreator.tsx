import React from "react";
import FileUploader from "./StepByStepComponents/FileUploader";
import BuildModel from "./StepByStepComponents/BuildModel";
import ErrorNotification from "./ErrorNotification";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setError,
  setLoading,
  setResponse,
  setActiveComponent,
  setTrainModelResult,
} from "../store/slices/modelSlice";

const ModelCreator = () => {
  const dispatch = useAppDispatch();

  const {
    activeComponent,
    error,
    loading,
    response,
    firstStepGeneralAnalyse,
    xFeatures,
    yFeatures,
    selectedModel,
    testSize,
  } = useAppSelector((state) => state.model);

  const handleTrainModel = async (
    xFeatures: string[],
    yFeatures: string,
    selectedModel: string,
    testSize: number
  ) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setResponse(""));

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
        dispatch(setTrainModelResult(data.result));
      } else {
        dispatch(setResponse("Fail upload"));
        dispatch(setError("Unexpected file type"));
      }
    } catch (err: any) {
      dispatch(setResponse("Fail upload"));
      dispatch(setError(err.message || "Error"));
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-[85%] h-full p-4 bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        {error && <ErrorNotification error={error} setError={() => dispatch(setError(null))} />}
      </div>

      {activeComponent === "FileUploader" && (
        <FileUploader
          setActiveComponent={(comp) => dispatch(setActiveComponent(comp))}
          setError={(err) => dispatch(setError(err))}
          loading={loading}
          setLoading={(val) => dispatch(setLoading(val))}
          response={response}
          setResponse={(msg) => dispatch(setResponse(msg))}
        />
      )}

      {activeComponent === "BuildModel" && (
        <BuildModel
          firstStepGeneralAnalyse={firstStepGeneralAnalyse}
          error={error}
          setActiveComponent={(comp) => dispatch(setActiveComponent(comp))}
          xFeatures={xFeatures}
          yFeatures={yFeatures}
          selectedModel={selectedModel}
          testSize={testSize}
          loading={loading}
          setLoading={(val) => dispatch(setLoading(val))}
          response={response}
          setResponse={(msg) => dispatch(setResponse(msg))}
          handleTrainModel={handleTrainModel}
        />
      )}
    </div>
  );
};

export default ModelCreator;
