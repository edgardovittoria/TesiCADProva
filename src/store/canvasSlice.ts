import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentEntity } from "../model/ComponentEntity";
import { StateWithHistory } from 'redux-undo';

export type CanvasState = {
    components: ComponentEntity[],
    numberOfGeneratedKey: number,
    selectedComponentKey: number,
    lastActionType: string
}

export const CanvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        components: [],
        numberOfGeneratedKey: 0,
        selectedComponentKey: 0,
        lastActionType: ""
    } as CanvasState,
    reducers: {
        //qui vanno inserite le azioni
        addComponent(state: CanvasState, action: PayloadAction<ComponentEntity>) {
            setLastActionType(state, action.type)
            state.components.push(action.payload);
            //state.selectedComponentKey = action.payload.keyComponent
        },
        removeComponent(state: CanvasState, action: PayloadAction<ComponentEntity>) {
            setLastActionType(state, action.type)
            resetSelectedComponent(state)
            state.components = state.components.filter(component => {
                return component.keyComponent !== action.payload.keyComponent;
            })
        },
        updatePosition(state: CanvasState, action: PayloadAction<[number, number, number]>) {
            setLastActionType(state, action.type)
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey)
            selectedComponent.previousPosition = selectedComponent.position
            selectedComponent.position = action.payload
            selectedComponent.lastTransformationType = "TRANSLATE"
        },
        updateRotation(state: CanvasState, action: PayloadAction<[number, number, number]>) {
            setLastActionType(state, action.type)
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey)
            selectedComponent.previousRotation = selectedComponent.rotation
            selectedComponent.rotation = action.payload
            selectedComponent.lastTransformationType = "ROTATE"
        },
        updateScale(state: CanvasState, action: PayloadAction<[number, number, number]>) {
            setLastActionType(state, action.type)
            let selectedComponent = findComponentByKey(state.components, state.selectedComponentKey)
            selectedComponent.previousScale = selectedComponent.scale
            selectedComponent.scale = action.payload
            selectedComponent.lastTransformationType = "SCALE"
        },
        selectComponent(state: CanvasState, action: PayloadAction<number>) {
            setLastActionType(state, action.type)
            state.selectedComponentKey = action.payload
        },
        incrementNumberOfGeneratedKey(state: CanvasState, action: PayloadAction<number>) {
            state.numberOfGeneratedKey += action.payload;
        },
        updateColor(state: CanvasState, action: PayloadAction<{ key: number, color: string }>) {
            setLastActionType(state, action.type)
            let component = findComponentByKey(state.components, action.payload.key);
            component.color = action.payload.color
        },
        updateName(state: CanvasState, action: PayloadAction<{ key: number, name: string }>) {
            setLastActionType(state, action.type)
            let component = findComponentByKey(state.components, action.payload.key);
            component.name = action.payload.name
        },
        importStateCanvas(state: CanvasState, action: PayloadAction<CanvasState>) {
            setLastActionType(state, action.type)
            state.components = action.payload.components
            state.numberOfGeneratedKey = action.payload.numberOfGeneratedKey
        },
        subtraction(state: CanvasState, action: PayloadAction<{elementsToRemove: number[], newEntity: ComponentEntity[], selectedEntityCopy: ComponentEntity}>){
            setLastActionType(state, action.type)
            resetSelectedComponent(state)
            state.components = state.components.filter(component => !action.payload.elementsToRemove.includes(component.keyComponent))
            action.payload.newEntity.map(entity => state.components.push(entity))
            state.components.push(action.payload.selectedEntityCopy)
        },
        union(state: CanvasState, action: PayloadAction<{elementsToRemove: number[], newEntity: ComponentEntity}>){
            setLastActionType(state, action.type)
            resetSelectedComponent(state)
            state.components = state.components.filter(component => !action.payload.elementsToRemove.includes(component.keyComponent))
            state.components.push(action.payload.newEntity)
        },
        intersection(state: CanvasState, action: PayloadAction<{elementsToRemove: number[], newEntity: ComponentEntity[]}>){
            setLastActionType(state, action.type)
            resetSelectedComponent(state)
            state.components = state.components.filter(component => !action.payload.elementsToRemove.includes(component.keyComponent))
            action.payload.newEntity.map(entity => state.components.push(entity))
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
    updateColor, updateName, importStateCanvas, subtraction, union, intersection
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present;
export const canvasAllStateSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas;
export const componentseSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present.components;
export const keySelectedComponenteSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present.selectedComponentKey;
export const selectedComponentSelector = (state: { canvas: StateWithHistory<CanvasState> }) => findComponentByKey(state.canvas.present.components, state.canvas.present.selectedComponentKey)
export const lengthPastStateSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.past.length
export const lengthFutureStateSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.future.length
export const lastActionTypeSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present.lastActionType;

export const findComponentByKey = (components: ComponentEntity[], key: number) => components.filter(component => component.keyComponent === key)[0]
const resetSelectedComponent = (state: CanvasState) => state.selectedComponentKey = 0
const setLastActionType = (state: CanvasState, actionType: string) => state.lastActionType = actionType
