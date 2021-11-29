import { Action,
    combineReducers,
    configureStore,
    ThunkAction } from '@reduxjs/toolkit';
import {CanvasSlice} from "./canvasSlice";
import {ToolbarTransformationSlice} from "./toolbarTransformationSlice";
import undoable from 'redux-undo';

const rootReducer = combineReducers({
    canvas: undoable(CanvasSlice.reducer),
    toolbarTransformation: ToolbarTransformationSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

