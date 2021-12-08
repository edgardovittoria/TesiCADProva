import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction
} from '@reduxjs/toolkit';
import {CanvasSlice} from "./canvasSlice";
import {ToolbarTransformationSlice} from "./toolbarTransformationSlice";
import undoable, {excludeAction} from 'redux-undo';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'
import persistStore from "redux-persist/es/persistStore";


const persistConfig = {
    key: 'root',
    storage: storage
}

const rootReducer = combineReducers({
    canvas: undoable(CanvasSlice.reducer, {
        filter: excludeAction(CanvasSlice.actions.incrementNumberOfGeneratedKey.type),
    }),
    toolbarTransformation: ToolbarTransformationSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

