import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type CanvasState = {
    components: JSX.Element[],
}

export const CanvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        components: [],
    } as CanvasState,
    reducers: {
        //qui vanno inserite le azioni
        addComponents(state: CanvasState, action: PayloadAction<JSX.Element>){
            state.components.push(action.payload)
        },
        removeComponent(state: CanvasState, action: PayloadAction<JSX.Element>){
            state.components = state.components.filter(component => {
                return component !== action.payload;
            })
        }
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
}
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addComponents,
    removeComponent
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: CanvasState }) => state.canvas