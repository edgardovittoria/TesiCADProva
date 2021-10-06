import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Vector3} from "@react-three/fiber";

export type CanvasState = {
    components: JSX.Element[],
    selectedComponent: number,
    numberOfGeneratedKey: number
}

export const CanvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        components: [],
        selectedComponent: -1,
        numberOfGeneratedKey: 0
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
            let selectedComponent = state.components.filter(component => (component.props.keyComponent === state.selectedComponent))[0];
            selectedComponent.props.position = action.payload
        },
        selectComponent(state: CanvasState, action: PayloadAction<number>){
            state.selectedComponent = action.payload
        },
        incrementNumberOfGeneratedKey(state: CanvasState){
            state.numberOfGeneratedKey++;
        }
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
}
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addComponent, removeComponent, updatePosition, selectComponent, incrementNumberOfGeneratedKey
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: CanvasState }) => state.canvas