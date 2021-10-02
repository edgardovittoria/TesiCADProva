import { Action,
    combineReducers,
    configureStore,
    ThunkAction } from '@reduxjs/toolkit';
import {CanvasSlice} from "./canvasSlice";

const rootReducer = combineReducers({
    canvas: CanvasSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>