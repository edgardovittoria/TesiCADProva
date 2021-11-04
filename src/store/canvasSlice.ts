import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { StateWithHistory } from 'redux-undo';
import {Box3} from "three";
import {ComponentEntity, CompositeEntity} from "../model/ComponentEntity";

export type CanvasState = {
    components: ComponentEntity[],
    numberOfGeneratedKey: number,
}

export const CanvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        components: [],
        numberOfGeneratedKey: 0,
    } as CanvasState,
    reducers: {
        //qui vanno inserite le azioni
        addComponent(state: CanvasState, action: PayloadAction<ComponentEntity>){
            state.components.push(action.payload);
        },
        removeComponent(state: CanvasState, action: PayloadAction<ComponentEntity>){
            state.components = state.components.filter(component => {
                return component.keyComponent !== action.payload.keyComponent;
            })
        },
        updatePosition(state: CanvasState, action: PayloadAction<[number,number,number]>){
            let selectedComponent = findSelectedComponent(state)
            selectedComponent.previousPosition = selectedComponent.position
            selectedComponent.position = action.payload
            selectedComponent.lastTransformationType = "TRANSLATE"
        },
        updateRotation(state: CanvasState, action: PayloadAction<[number,number,number]>){
            let selectedComponent = findSelectedComponent(state)
            selectedComponent.previousRotation = selectedComponent.rotation
            selectedComponent.rotation = action.payload
            selectedComponent.lastTransformationType = "ROTATE"
        },
        updateScale(state: CanvasState, action: PayloadAction<[number,number,number]>){
            let selectedComponent = findSelectedComponent(state)
            selectedComponent.previousScale = selectedComponent.scale
            selectedComponent.scale = action.payload
            selectedComponent.lastTransformationType = "SCALE"
        },
        updateBox3(state: CanvasState, action: PayloadAction<{key: number ,box3: Box3}>){
            let component = findComponentByKey(state, action.payload.key)
            component.box3Min = [action.payload.box3.min.x, action.payload.box3.min.y, action.payload.box3.min.z]
            component.box3Max = [action.payload.box3.max.x, action.payload.box3.max.y, action.payload.box3.max.z]
        },
        updateCompositeEntityPositionVertices(state: CanvasState, action: PayloadAction<{key: number, vertices: Float32Array}>){
            let component = findComponentByKey(state, action.payload.key);
            (component as CompositeEntity).geometryPositionVertices = action.payload.vertices
        },
        updateCompositeEntityNormalVertices(state: CanvasState, action: PayloadAction<{key: number, vertices: Float32Array}>){
            let component = findComponentByKey(state, action.payload.key);
            (component as CompositeEntity).geometryNormalVertices = action.payload.vertices
        },
        updateCompositeEntityUvVertices(state: CanvasState, action: PayloadAction<{key: number, vertices: Float32Array}>){
            let component = findComponentByKey(state, action.payload.key);
            (component as CompositeEntity).geometryUvVertices = action.payload.vertices
        },

        selectComponent(state: CanvasState, action: PayloadAction<number>){
            state.components.map(component => {
                (component.keyComponent === action.payload)? component.isSelected = true : component.isSelected = false
            })
        },
        incrementNumberOfGeneratedKey(state: CanvasState, action: PayloadAction<number>){
            state.numberOfGeneratedKey += action.payload;
        },
    
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
}
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addComponent, removeComponent, updatePosition, updateRotation,
    updateScale, updateBox3, selectComponent, incrementNumberOfGeneratedKey,
    updateCompositeEntityPositionVertices, updateCompositeEntityNormalVertices, updateCompositeEntityUvVertices
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: StateWithHistory<CanvasState> }) => state.canvas.present;
export const selectedComponentSelector = (state: { canvas: StateWithHistory<CanvasState> }) => findSelectedComponent(state.canvas.present)

const findSelectedComponent = (canvas: CanvasState) => canvas.components.filter(component => component.isSelected)[0]
const findComponentByKey = (canvas: CanvasState, key: number) => canvas.components.filter(component => component.keyComponent === key)[0]