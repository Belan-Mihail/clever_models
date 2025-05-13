import React from "react";

interface FirstStepAnalyse {
  columns: string[];
  columns_type: string[];
  rows_count: number;
}

interface SelectFeaturesProps {
  firstStepGeneralAnalyse: FirstStepAnalyse;
  setError: (data: any) => void;
  setActiveComponent: (componentName: string) => void;
  handleXFeatures: (features: string[]) => void;
  handleYFeatures: (features: string[]) => void;
}

const SelectFeatures: React.FC<SelectFeaturesProps> = ({
  firstStepGeneralAnalyse,
  setError,
  setActiveComponent,
  handleXFeatures,
  handleYFeatures,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Выберите признаки</h2>
      <pre className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
        {JSON.stringify(firstStepGeneralAnalyse, null, 2)}
      </pre>
    </div>
  );
};

export default SelectFeatures;
