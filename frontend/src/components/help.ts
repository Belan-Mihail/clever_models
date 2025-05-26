// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
// import FileUploader from "./StepByStepComponents/fileUploader";
// import SelectFeatures from "./StepByStepComponents/SelectFeatures";
// import ErrorNotification from "./ErrorNotification";

// const ModelCreator = () => {

//   // general states and function
//    const [error, setError] = useState<any>(null);
//    const [activeComponent, setActiveComponent] = useState("")

//    useEffect(() => {
//     setActiveComponent("FileUploader")

//    }, [])
   

//    // general anlyse file after upload (validation file)- return: object columns, column_type, rows_counr
//   const [firstStepGeneralAnalyse, setFirstStepGeneralAnalyse] = useState<any>(null);

//   const handleFirstStepGeneralAnalyse = (data: any) => {
//     setFirstStepGeneralAnalyse(data);
//   };

//   // user choose fetureas from column and send it to ML. return:
//   const [xFeatures, setXFeatures] = useState<any>(null);
//   const [yFeatures, setYFeatures] = useState<any>(null);

//   const handleXFeatures = (data: any) => {
//     setXFeatures(data);
//   };

//   const handleYFeatures = (data: any) => {
//     setYFeatures(data);
//   };

//   return (
//     <div className={`w-[85%] h-full p-4 bg-white`}>

//       <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
//         {error && <ErrorNotification error={error} setError={setError} />}
//       </div>
    
//       {activeComponent=="FileUploader" && <FileUploader handleFirstStepGeneralAnalyse={handleFirstStepGeneralAnalyse} setError={setError} setActiveComponent={setActiveComponent} />}
      
//       {activeComponent=="SelectFeatures" && (<SelectFeatures firstStepGeneralAnalyse={firstStepGeneralAnalyse} setError={setError} setActiveComponent={setActiveComponent} handleXFeatures={handleXFeatures} handleYFeatures={handleYFeatures} />)}
    
//     </div>
//   );
// };

// export default ModelCreator;


// !!!!!!!!!!!!!!

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface FirstStepAnalyse {
//   columns: string[];
//   columns_type: string[];
//   rows_count: number;
// }

// interface BuildModelProps {
//   firstStepGeneralAnalyse: FirstStepAnalyse;
//   setError: (data: any) => void;
//   setActiveComponent: (componentName: string) => void;
//   handleXFeatures: (features: string[]) => void;
//   handleYFeatures: (features: string) => void;
//   xFeatures: string[];
//   yFeatures: string[];
// }

// const BuildModel: React.FC<BuildModelProps> = ({
//   firstStepGeneralAnalyse,
//   setError,
//   setActiveComponent,
//   handleXFeatures,
//   handleYFeatures,
//   xFeatures,
//   yFeatures,
// }) => {
//   const [showSecondSelect, setShowSecondSelect] = useState(false);

//   const toggleXFeatures = (feature: string) => {
//     const newFeatures = xFeatures.includes(feature)
//       ? xFeatures.filter((f) => f !== feature)
//       : [...xFeatures, feature];
//     handleXFeatures(newFeatures);
//   };

//   if (
//     !firstStepGeneralAnalyse ||
//     !Array.isArray(firstStepGeneralAnalyse.columns) ||
//     !Array.isArray(firstStepGeneralAnalyse.columns_type)
//   ) {
//     return (
//       <div className="text-center text-sm text-gray-500 p-4">
//         Loading data...
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-2 text-center">
//         Select {!showSecondSelect ? "X features" : "target variable"}
//       </h2>

//       <AnimatePresence mode="wait">
//         {firstStepGeneralAnalyse.columns.length > 0 &&  (
//           <>
            // <motion.div
            //   key="feature-table"
            //   initial={{ opacity: 0, y: 30 }}
            //   animate={{ opacity: 1, y: 0 }}
            //   exit={{ opacity: 0, y: -30 }}
            //   transition={{ duration: 0.4, ease: "easeInOut" }}
            //   className="w-[90%] mx-auto overflow-x-auto"
            // >
            //   <div className="w-full overflow-x-auto p-2">
            //     <div className="min-w-full inline-flex gap-4">
            //       {firstStepGeneralAnalyse.columns.map(
            //         (col: string, index: number) => (
            //           <div
            //             key={col}
            //             className="flex flex-col items-center justify-start min-w-[140px] max-w-[200px] border border-gray-200 rounded-md p-2 bg-gray-50"
            //           >
            //             <div className="text-xs text-gray-500 mb-1">
            //               #{index + 1}
            //             </div>
            //             <div className="text-sm font-semibold text-center break-words">
            //               {col}
            //             </div>
            //             <div className="text-xs text-gray-400 mt-1">
            //               {firstStepGeneralAnalyse.columns_type[index]}
            //             </div>
            //             <div className="mt-2">
            //               <input
            //                 type="checkbox"
            //                 onChange={() => handleYFeatures(col)}
            //                 className="form-checkbox h-4 w-4 text-amber-500"
            //               />
            //             </div>
            //           </div>
            //         )
            //       )}
            //     </div>
            //   </div>
            //   <motion.div
            //     key="feature-table"
            //     initial={{ opacity: 0, y: 30 }}
            //     animate={{ opacity: 1, y: 0 }}
            //     exit={{ opacity: 0, y: -30 }}
            //     transition={{ duration: 0.4, ease: "easeInOut" }}
            //   >
            //     <button
            //       onClick={() => setShowSecondSelect(true)}
            //       className="mt-2 p-2 bg-rose-500 rounded-xl text-white text-[10px]"
            //     >
            //       Select Target Variable
            //     </button>
            //   </motion.div>
            //   <motion.div
            //     key="feature-table"
            //     initial={{ opacity: 0, y: 30 }}
            //     animate={{ opacity: 1, y: 0 }}
            //     exit={{ opacity: 0, y: -30 }}
            //     transition={{ duration: 0.4, ease: "easeInOut" }}
            //   >
            //     <div className="mt-2 w-max text-black text-[10px]">
            //       <p>
            //         X features:{" "}
            //         {xFeatures.map((xFeature, index) => (
            //           <span key={index} className="mr-2">
            //             {xFeature}
            //           </span>
            //         ))}
            //       </p>
            //     </div>
            //   </motion.div>
            // </motion.div>
//           </>
//         )}
//       </AnimatePresence>
// //     </div>
// //   );
// // };

// // export default BuildModel;


// {modelOptions.map((model) => (
//     <button
//       key={model}
//       onClick={() => handleModelChange(model)}
//       className={`px-4 py-2 text-xs rounded-lg border ${
//         selectedModel === model
//           ? "bg-green-500 text-white"
//           : "bg-white text-gray-700"
//       }`}
//     >
//       {model}
//     </button>
//   ))}


// <select
//   className="text-xs p-2 border rounded"
//   value={testSize}
//   onChange={(e) => setTestSize(Number(e.target.value))}
// >
//   {[0.1, 0.2, 0.3, 0.4].map((value) => (
//     <option key={value} value={value}>
//       Test size: {value * 100}%
//     </option>
//   ))}
// </select>


// await fetch("http://127.0.0.1:5000/api/save_model", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     model_id: modelId,
//     name: "my_regression_model", // имя для сохранения
//   }),
// });


// await fetch("http://127.0.0.1:5000/api/delete_model", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ model_id: modelId }),
// });
