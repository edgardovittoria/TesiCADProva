import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {Box3} from "three";
import {ComponentEntity} from "../model/ComponentEntity";
import {makeBinaryOperation} from "../hooks/useDetectComponentsCollision";
import { StateWithHistory } from 'redux-undo';

export type CanvasState = {
    binaryOperationExecuting: boolean
    components: ComponentEntity[],
    numberOfGeneratedKey: number,
    selectedComponentKey: number
}

export const CanvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        binaryOperationExecuting: false,
        components: [],
        numberOfGeneratedKey: 0,
        selectedComponentKey: 0,
    } as CanvasState,
    reducers: {
        //qui vanno inserite le azioni
        addComponent(state: CanvasState, action: PayloadAction<ComponentEntity>) {
            state.components.push(action.payload);
            state.selectedComponentKey = action.payload.keyComponent
        },
        removeComponent(state: CanvasState, action: PayloadAction<ComponentEntity>) {
            state.components = state.components.filter(component => {
                return component.keyComponent !== action.payload.keyComponent;
            })
        },
        updatePosition(state: CanvasState, action: PayloadAction<[number, number, number]>) {
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey)
            selectedComponent.previousPosition = selectedComponent.position
            selectedComponent.position = action.payload
            // selectedComponent.box3Min = [action.payload.box3.min.x, action.payload.box3.min.y, action.payload.box3.min.z]
            // selectedComponent.box3Max = [action.payload.box3.max.x, action.payload.box3.max.y, action.payload.box3.max.z]
            selectedComponent.lastTransformationType = "TRANSLATE"
        },
        updateRotation(state: CanvasState, action: PayloadAction<[number, number, number]>) {
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey)
            selectedComponent.previousRotation = selectedComponent.rotation
            selectedComponent.rotation = action.payload
            // selectedComponent.box3Min = [action.payload.box3.min.x, action.payload.box3.min.y, action.payload.box3.min.z]
            // selectedComponent.box3Max = [action.payload.box3.max.x, action.payload.box3.max.y, action.payload.box3.max.z]
            selectedComponent.lastTransformationType = "ROTATE"
        },
        updateScale(state: CanvasState, action: PayloadAction<[number, number, number]>) {
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey)
            selectedComponent.previousScale = selectedComponent.scale
            selectedComponent.scale = action.payload
            // selectedComponent.box3Min = [action.payload.box3.min.x, action.payload.box3.min.y, action.payload.box3.min.z]
            // selectedComponent.box3Max = [action.payload.box3.max.x, action.payload.box3.max.y, action.payload.box3.max.z]
            selectedComponent.lastTransformationType = "SCALE"
        },
        // updateBox3(state: CanvasState, action: PayloadAction<{ key: number, box3: Box3 }>) {
        //     let component = findComponentByKey(state.components, action.payload.key)
        //     component.box3Min = [action.payload.box3.min.x, action.payload.box3.min.y, action.payload.box3.min.z]
        //     component.box3Max = [action.payload.box3.max.x, action.payload.box3.max.y, action.payload.box3.max.z]
        // },
        selectComponent(state: CanvasState, action: PayloadAction<number>) {
            state.selectedComponentKey = action.payload
        },
        incrementNumberOfGeneratedKey(state: CanvasState, action: PayloadAction<number>) {
            state.numberOfGeneratedKey += action.payload;
        },
        updateColor(state: CanvasState, action: PayloadAction<{ key: number, color: string }>) {
            let component = findComponentByKey(state.components, action.payload.key);
            component.color = action.payload.color
        },
        updateName(state: CanvasState, action: PayloadAction<{ key: number, name: string }>) {
            let component = findComponentByKey(state.components, action.payload.key);
            component.name = action.payload.name
        },
        importStateCanvas(state: CanvasState, action: PayloadAction<CanvasState>) {
            state.components = action.payload.components
            state.numberOfGeneratedKey = action.payload.numberOfGeneratedKey
        },
        setBinaryOperationExecuting(state: CanvasState, action: PayloadAction<boolean>){
            state.binaryOperationExecuting = action.payload
        }

    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
    }
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addComponent, removeComponent, updatePosition, updateRotation,
    updateScale, selectComponent, incrementNumberOfGeneratedKey,
    updateColor, updateName, importStateCanvas, setBinaryOperationExecuting
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present;
export const componentseSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present.components;
export const keySelectedComponenteSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present.selectedComponentKey;
export const selectedComponentSelector = (state: { canvas: StateWithHistory<CanvasState> }) => findComponentByKey(state.canvas.present.components, state.canvas.present.selectedComponentKey)
export const binaryOperationExecution = (state: {canvas: StateWithHistory<CanvasState>}) => state.canvas.present.binaryOperationExecuting

export const findComponentByKey = (components: ComponentEntity[], key: number) => components.filter(component => component.keyComponent === key)[0]
