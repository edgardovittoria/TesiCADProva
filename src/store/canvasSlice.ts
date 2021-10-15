import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {Euler, Vector3} from "@react-three/fiber";
import {Box3, Mesh} from "three";

export type CanvasState = {
    components: JSX.Element[],
    selectedComponent: JSX.Element | null,
    numberOfGeneratedKey: number,
    isLoading: boolean
}

export const CanvasSlice = createSlice({
    name: 'canvas',
    initialState: {
        components: [],
        selectedComponent: null,
        numberOfGeneratedKey: 0,
        isLoading: false
    } as CanvasState,
    reducers: {
        //qui vanno inserite le azioni
        addComponent(state: CanvasState, action: PayloadAction<JSX.Element>){
            state.components.push(action.payload);
        },
        removeComponent(state: CanvasState, action: PayloadAction<JSX.Element>){
            state.components = state.components.filter(component => {
                return component !== action.payload;
            })
        },
        updatePosition(state: CanvasState, action: PayloadAction<Vector3>){
            state.isLoading = true;
            let selectedComponent = state.components.filter(component => component.props.keyComponent === state.selectedComponent)[0];
            selectedComponent.props.position = action.payload
            state.isLoading = false
        },
        updateRotation(state: CanvasState, action: PayloadAction<Euler>){
            state.isLoading = true;
            let selectedComponent = state.components.filter(component => component.props.keyComponent === state.selectedComponent)[0];
            selectedComponent.props.rotation = action.payload
            state.isLoading = false
        },
        updateScale(state: CanvasState, action: PayloadAction<Vector3>){
            state.isLoading = true;
            let selectedComponent = state.components.filter(component => component.props.keyComponent === state.selectedComponent)[0];
            selectedComponent.props.scale = action.payload
            state.isLoading = false
        },
        updateBox3(state: CanvasState, action: PayloadAction<Mesh | null>){
            let meshRef = action.payload
            if(meshRef !== null && state.selectedComponent !== null){
                (meshRef as Mesh).geometry.computeBoundingBox();
                state.selectedComponent.props.box3 = (meshRef as Mesh).geometry.boundingBox;
                state.selectedComponent.props.box3?.applyMatrix4((meshRef as Mesh).matrixWorld);
            }
        },
        selectComponent(state: CanvasState, action: PayloadAction<number>){
            let selectedComponent = current(state.components.filter(component => component.props.keyComponent === action.payload)[0]);
            state.selectedComponent = selectedComponent;
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
    addComponent, removeComponent, updatePosition, updateRotation, updateScale, updateBox3, selectComponent, incrementNumberOfGeneratedKey
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: CanvasState }) => state.canvas