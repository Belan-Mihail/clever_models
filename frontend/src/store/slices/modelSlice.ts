import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModelState {
  error: string | null;
  activeComponent: string;
  loading: boolean;
  response: string | null;
  firstStepGeneralAnalyse: any;
  xFeatures: string[];
  yFeatures: string;
  selectedModel: string;
  testSize: number;
  onTrainModelResult: any;
  currentStep: number; // 🆕 добавили
}

const initialState: ModelState = {
  error: null,
  activeComponent: 'FileUploader',
  loading: false,
  response: null,
  firstStepGeneralAnalyse: null,
  xFeatures: [],
  yFeatures: '',
  selectedModel: '',
  testSize: 0.2,
  onTrainModelResult: null,
  currentStep: 0, // 🆕 добавили
};

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setActiveComponent(state, action: PayloadAction<string>) {
      state.activeComponent = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setResponse(state, action: PayloadAction<string | null>) {
      state.response = action.payload;
    },
    setFirstStepGeneralAnalyse(state, action: PayloadAction<any>) {
      state.firstStepGeneralAnalyse = action.payload;
    },
    setXFeatures(state, action: PayloadAction<string[]>) {
      state.xFeatures = action.payload;
    },
    setYFeatures(state, action: PayloadAction<string>) {
      state.yFeatures = action.payload;
    },
    setSelectedModel(state, action: PayloadAction<string>) {
      state.selectedModel = action.payload;
    },
    setTestSize(state, action: PayloadAction<number>) {
      state.testSize = action.payload;
    },
    setTrainModelResult(state, action: PayloadAction<any>) {
      state.onTrainModelResult = action.payload;
    },
    setCurrentStep(state, action: PayloadAction<number>) { // 🆕 добавили
      state.currentStep = action.payload;
    },
  },
});

export const {
  setError,
  setActiveComponent,
  setLoading,
  setResponse,
  setFirstStepGeneralAnalyse,
  setXFeatures,
  setYFeatures,
  setSelectedModel,
  setTestSize,
  setTrainModelResult,
  setCurrentStep, // 🆕 добавили
} = modelSlice.actions;

export default modelSlice.reducer;
