import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchModels = createAsyncThunk(
  "models/fetchModels",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/list_models");
      const data = await res.json();
      if (data.status === "ok") {
        return data.models;
      } else {
        return thunkAPI.rejectWithValue(data.message || "Failed to fetch models");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Network error");
    }
  }
);

interface modelsState {
    list: any[];
    loading: boolean;
    error: string | null;
    
}

const initialState: modelsState = {
    list: [],
    loading: false,
    error: null
}

const treeModelsSlice = createSlice({
    name: "treeModels",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchModels.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchModels.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchModels.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })
    }
})

export default treeModelsSlice.reducer;