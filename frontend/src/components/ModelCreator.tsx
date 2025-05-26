import React from "react";
import FileUploader from "./StepByStepComponents/FileUploader";
import BuildModel from "./StepByStepComponents/BuildModel";
import ErrorNotification from "./ErrorNotification";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setError } from "../store/slices/modelSlice";

const ModelCreator = () => {
  const dispatch = useAppDispatch();

  const { activeComponent, error } = useAppSelector((state) => state.model);

  return (
    <div className="w-[85%] h-full p-4 bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        {error && (
          <ErrorNotification error={error} setError={() => dispatch(setError(null))} />
        )}
      </div>

      {activeComponent === "FileUploader" && <FileUploader />}
      {activeComponent === "BuildModel" && <BuildModel />}
    </div>
  );
};

export default ModelCreator;
