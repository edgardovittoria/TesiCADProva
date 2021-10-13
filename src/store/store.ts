import { Action,
    combineReducers,
    configureStore,
    ThunkAction } from '@reduxjs/toolkit';
import {CanvasSlice} from "./canvasSlice";
import {ToolbarTransformationSlice} from "./toolbarTransformationSlice";

const rootReducer = combineReducers({
    canvas: CanvasSlice.reducer,
    toolbarTransformation: ToolbarTransformationSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>