import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction
} from '@reduxjs/toolkit';
import {ToolbarTransformationSlice} from "./toolbarTransformationSlice";
import undoable, {excludeAction} from 'redux-undo';
import { persistReducer } from 'redux-persist'
import persistStore from "redux-persist/es/persistStore";
import localforage from 'localforage';
import { CanvasSlice, UsersSlice } from 'cad-library';
import { BinaryOperationsToolbarSlice } from '../components/binaryOperationsToolbar/binaryOperationsToolbarSlice';


const persistConfig = {
    key: 'root',
    storage: localforage
}

const rootReducer = combineReducers({
    canvas: undoable(CanvasSlice.reducer, {
        limit: 20,
        filter: excludeAction(CanvasSlice.actions.incrementNumberOfGeneratedKey.type),
    }),
    toolbarTransformation: ToolbarTransformationSlice.reducer,
    toolbarBinaryOperations: BinaryOperationsToolbarSlice.reducer,
    user: UsersSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

