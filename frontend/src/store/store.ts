import { configureStore } from '@reduxjs/toolkit';
import modelReducer from './slices/modelSlice';
import treeModelsReducer from './slices/TreeModelsSlice'; 

export const store = configureStore({
  reducer: {
    model: modelReducer,
    treeModels: treeModelsReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
