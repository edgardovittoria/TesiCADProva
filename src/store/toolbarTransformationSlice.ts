import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TransformationItem = {
    type: string,
    active: boolean
}

export type ToolbarTransformationState = {
    transformation: TransformationItem[]
}

export const ToolbarTransformationSlice = createSlice({
    name: 'toolbarTransformation',
    initialState: {
        transformation: [
            {
                type: 'translate',
                active: true
            },
            {
                type: 'rotate',
                active: false
            },
            {
                type: 'scale',
                active: false
            }]
    } as ToolbarTransformationState,
    reducers: {
        setTransformationActive(transformationState: ToolbarTransformationState, action: PayloadAction<string>){
            transformationState.transformation.map(transformation => {
                (transformation.type === action.payload) ? transformation.active = true : transformation.active = false;
            })
        }
    }
})

export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    setTransformationActive
} = ToolbarTransformationSlice.actions

export const toolbarTransformationStateSelector = (state: { toolbarTransformation: ToolbarTransformationState }) => state.toolbarTransformation