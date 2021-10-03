import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Vector3} from "@react-three/fiber";

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
        addComponent(state: CanvasState, action: PayloadAction<JSX.Element>){
            state.components.push(action.payload)
        },
        removeComponent(state: CanvasState, action: PayloadAction<JSX.Element>){
            state.components = state.components.filter(component => {
                return component !== action.payload;
            })
        },
        updatePosition(state: CanvasState, action: PayloadAction<Vector3>){
            state.components.map(component => {
                component.props.position = action.payload;
            })
        },
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
}
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addComponent, removeComponent, updatePosition
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: CanvasState }) => state.canvas