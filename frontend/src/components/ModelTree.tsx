import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchModels } from "../store/slices/TreeModelsSlice";

const ModelTree: React.FC = () => {
  const dispatch = useAppDispatch();
  const models = useAppSelector((state) => state.treeModels.list)
  const loading = useAppSelector((state) => state.treeModels.loading);

  useEffect(() => {
    dispatch(fetchModels())
  }, [dispatch]);

  return (
    <div className="w-[15%] h-full bg-gray-100 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">Saved Models</h3>
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : models.length === 0 ? (
        <p className="text-sm text-gray-500">No models found</p>
      ) : (
        <ul className="text-sm space-y-1">
          {models.map((model) => (
            <li key={model} className="text-gray-800 hover:underline cursor-pointer">
              {model}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModelTree;
