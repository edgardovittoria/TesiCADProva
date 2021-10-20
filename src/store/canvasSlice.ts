import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Euler, Vector3} from "@react-three/fiber";
import {Mesh} from "three";

export type CanvasState = {
    components: JSX.Element[],
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
            let selectedComponent = selectedComponentSelector(state)
            selectedComponent.props.position = action.payload
            state.isLoading = false
        },
        updateRotation(state: CanvasState, action: PayloadAction<Euler>){
            state.isLoading = true;
            let selectedComponent = selectedComponentSelector(state)
            selectedComponent.props.rotation = action.payload
            state.isLoading = false
        },
        updateScale(state: CanvasState, action: PayloadAction<Vector3>){
            state.isLoading = true;
            let selectedComponent = selectedComponentSelector(state)
            selectedComponent.props.scale = action.payload
            state.isLoading = false
        },
        updateBox3(state: CanvasState, action: PayloadAction<Mesh | null>){
            let meshRef = action.payload
            let selectedComponent = selectedComponentSelector(state)
            if(meshRef !== null && selectedComponent !== undefined){
                (meshRef as Mesh).geometry.computeBoundingBox();
                selectedComponent.props.box3 = (meshRef as Mesh).geometry.boundingBox;
                selectedComponent.props.box3?.applyMatrix4((meshRef as Mesh).matrixWorld);
            }
        },
        selectComponent(state: CanvasState, action: PayloadAction<number>){
            //let selectedComponent = current(state.components.filter(component => component.props.keyComponent === action.payload)[0]);
            // state.selectedComponent = selectedComponent;
            state.components.map(component => {
                return (component.props.keyComponent === action.payload)? component.props.isSelected = true : component.props.isSelected = false    
            })
        },
        incrementNumberOfGeneratedKey(state: CanvasState){
            state.numberOfGeneratedKey++;
        },
        setMeshRefComponent(state: CanvasState, action: PayloadAction<{key: number, meshRef: Mesh | null}>){
            let component = selectedComponentSelector(state)
            component.props.meshRef = action.payload.meshRef
        }
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
}
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addComponent, removeComponent, updatePosition, updateRotation, updateScale, updateBox3, selectComponent, setMeshRefComponent, incrementNumberOfGeneratedKey
} = CanvasSlice.actions

export const canvasStateSelector = (state: { canvas: CanvasState }) => state.canvas;
export const selectedComponentSelector = (canvas:CanvasState) => canvas.components.filter(component => component.props.isSelected)[0]