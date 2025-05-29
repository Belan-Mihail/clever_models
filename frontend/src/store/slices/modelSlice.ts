import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export const trainModelAsync = createAsyncThunk<
  any,
  {
    xFeatures: string[];
    yFeature: string;
    selectedModel: string;
    testSize: number;
    sessionId: string;
  },
  { rejectValue: string }
>("model/trainModel", async (params, thunkAPI) => {
  const { xFeatures, yFeature, selectedModel, testSize, sessionId } = params;

  try {
    const response = await fetch("http://127.0.0.1:5000/api/select_columns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x: xFeatures,
        y: yFeature,
        selectedModel,
        testSize,
        session_id: sessionId,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      return {
        metrics: data.metrics,
        modelId: data.model_id,
      };
    } else {
      return thunkAPI.rejectWithValue(
        data.message || "Server responded with error"
      );
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Network error");
  }
});

interface savedModel {
  sessionId: string;
  model: string;
  xFeatures: string[];
  yFeatures: string;
  testSize: number;
  metrics: {mse: number; mae: number, r2: number }
  savedAt: string,
}

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
  currentStep: number;
  sessionId: null | string;
  metrics: null | { mse: number, mae: number, r2:number}
  modelId: null | string;
  modelSaved: boolean;
  savedModels: savedModel[];
}

const initialState: ModelState = {
  error: null,
  activeComponent: "FileUploader",
  loading: false,
  response: null,
  firstStepGeneralAnalyse: null,
  xFeatures: [],
  yFeatures: "",
  selectedModel: "",
  testSize: 0.2,
  currentStep: 0,
  sessionId: null,
  metrics: null,
  modelId: null,
  modelSaved: false,
  savedModels: [] as savedModel[],

};

export const modelSlice = createSlice({
  name: "model",
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
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    resetModelState(state) {
  state.error = null;
  state.activeComponent = "FileUploader";
  state.loading = false;
  state.response = null;
  state.firstStepGeneralAnalyse = null;
  state.xFeatures = [];
  state.yFeatures = "";
  state.selectedModel = "";
  state.testSize = 0.2;
  state.currentStep = 0;
  state.sessionId = null;
  state.metrics = null;
  state.modelId = null;
  state.modelSaved = false;
},
    saveTrainedModel(state, action: PayloadAction<savedModel>) {
      state.savedModels.push(action.payload);
      state.modelSaved = true;
    },
    setSessionId(state, action: PayloadAction<string | null>) {
      state.sessionId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(trainModelAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.metrics = null;
        state.modelId = null;
        state.modelSaved = false
      })
      .addCase(trainModelAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload.metrics;
        state.modelId = action.payload.modelId;
        state.modelSaved = false;
        state.currentStep = 4;
      })
      .addCase(trainModelAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to train model";
        state.response = "Fail upload";
      });
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
  setCurrentStep,
  setSessionId,
  saveTrainedModel,
  resetModelState,
} = modelSlice.actions;

export default modelSlice.reducer;
