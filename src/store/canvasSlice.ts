import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Box3} from "three";
import {ComponentEntity} from "../model/ComponentEntity";

export type CanvasState = {
    components: ComponentEntity[],
    numberOfGeneratedKey: number,
    isLoading: boolean
}

export const CanvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        components: [],
        numberOfGeneratedKey: 0,
        isLoading: false
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
            state.isLoading = true;
            let selectedComponent = findSelectedComponent(state)
            selectedComponent.position = action.payload
            state.isLoading = false
        },
        updateRotation(state: CanvasState, action: PayloadAction<[number,number,number]>){
            state.isLoading = true;
            let selectedComponent = findSelectedComponent(state)
            selectedComponent.rotation = action.payload
            state.isLoading = false
        },
        updateScale(state: CanvasState, action: PayloadAction<[number,number,number]>){
            state.isLoading = true;
            let selectedComponent = findSelectedComponent(state)
            selectedComponent.scale = action.payload
            state.isLoading = false
        },
        updateBox3(state: CanvasState, action: PayloadAction<{key: number ,box3: Box3}>){
            let component = findComponentByKey(state, action.payload.key)
            component.box3Min = [action.payload.box3.min.x, action.payload.box3.min.y, action.payload.box3.min.z]
            component.box3Max = [action.payload.box3.max.x, action.payload.box3.max.y, action.payload.box3.max.z]
        },
        selectComponent(state: CanvasState, action: PayloadAction<number>){
            state.components.map(component => {
                (component.keyComponent === action.payload)? component.isSelected = true : component.isSelected = false
            })
        },
        incrementNumberOfGeneratedKey(state: CanvasState, action: PayloadAction<number>){
            state.numberOfGeneratedKey += action.payload;
        },
        subtractionComponent(state: CanvasState, action: PayloadAction<{keyComponentToSubstitute: number, newComponent: ComponentEntity}>){
            state.components = state.components.filter(component => component.keyComponent !== action.payload.keyComponentToSubstitute)
            state.components.push(action.payload.newComponent);
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
    subtractionComponent
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: CanvasState }) => state.canvas;
export const selectedComponentSelector = (state: { canvas: CanvasState }) => findSelectedComponent(state.canvas)

const findSelectedComponent = (canvas: CanvasState) => canvas.components.filter(component => component.isSelected)[0]
const findComponentByKey = (canvas: CanvasState, key: number) => canvas.components.filter(component => component.keyComponent === key)[0]