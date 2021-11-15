import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Box3 } from "three";
import { ComponentEntity, CompositeEntity } from "../model/ComponentEntity";
export type CanvasState = {
    binaryOperationExecuting: boolean
    components: ComponentEntity[],
    numberOfGeneratedKey: number,
}

export const CanvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        binaryOperationExecuting: false,
        components: [],
        numberOfGeneratedKey: 0,
    } as CanvasState,
    reducers: {
        //qui vanno inserite le azioni
        addComponent(state: CanvasState, action: PayloadAction<ComponentEntity>) {
            state.components.push(action.payload);
        },
        removeComponent(state: CanvasState, action: PayloadAction<ComponentEntity>) {
            state.components = state.components.filter(component => {
                return component.keyComponent !== action.payload.keyComponent;
            })
        },
        updatePosition(state: CanvasState, action: PayloadAction<[number, number, number]>) {
            let selectedComponent = findSelectedComponent(state)
            selectedComponent.previousPosition = selectedComponent.position
            selectedComponent.position = action.payload
            selectedComponent.lastTransformationType = "TRANSLATE"
        },
        updateRotation(state: CanvasState, action: PayloadAction<[number, number, number]>) {
            let selectedComponent = findSelectedComponent(state)
            selectedComponent.previousRotation = selectedComponent.rotation
            selectedComponent.rotation = action.payload
            selectedComponent.lastTransformationType = "ROTATE"
        },
        updateScale(state: CanvasState, action: PayloadAction<[number, number, number]>) {
            let selectedComponent = findSelectedComponent(state)
            selectedComponent.previousScale = selectedComponent.scale
            selectedComponent.scale = action.payload
            selectedComponent.lastTransformationType = "SCALE"
        },
        updateBox3(state: CanvasState, action: PayloadAction<{ key: number, box3: Box3 }>) {
            let component = findComponentByKey(state, action.payload.key)
            component.box3Min = [action.payload.box3.min.x, action.payload.box3.min.y, action.payload.box3.min.z]
            component.box3Max = [action.payload.box3.max.x, action.payload.box3.max.y, action.payload.box3.max.z]
        },
        selectComponent(state: CanvasState, action: PayloadAction<number>) {
            state.components.map(component => {
                (component.keyComponent === action.payload) ? component.isSelected = true : component.isSelected = false
            })
        },
        incrementNumberOfGeneratedKey(state: CanvasState, action: PayloadAction<number>) {
            state.numberOfGeneratedKey += action.payload;
        },
        updateColor(state: CanvasState, action: PayloadAction<{ key: number, color: string }>) {
            let component = findComponentByKey(state, action.payload.key);
            component.color = action.payload.color
        },
        updateName(state: CanvasState, action: PayloadAction<{ key: number, name: string }>) {
            let component = findComponentByKey(state, action.payload.key);
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
    updateScale, updateBox3, selectComponent, incrementNumberOfGeneratedKey,
    updateColor, updateName, importStateCanvas, setBinaryOperationExecuting
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: CanvasState }) => state.canvas;
export const selectedComponentSelector = (state: { canvas: CanvasState }) => findSelectedComponent(state.canvas)
export const binaryOperationExecution = (state: {canvas: CanvasState}) => state.canvas.binaryOperationExecuting

const findSelectedComponent = (canvas: CanvasState) => canvas.components.filter(component => component.isSelected)[0]
export const findComponentByKey = (canvas: CanvasState, key: number) => canvas.components.filter(component => component.keyComponent === key)[0]

