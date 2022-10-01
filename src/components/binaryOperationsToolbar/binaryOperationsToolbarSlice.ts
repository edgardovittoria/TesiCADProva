import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BinaryOperationType } from "cad-library";


export type BinaryOperationsToolbarState = {
    binaryOp: string | undefined,
    entities: number[]
}

export const BinaryOperationsToolbarSlice = createSlice({
    name: 'toolbarBinaryOperations',
    initialState: {
        binaryOp: undefined,
        entities: []
    } as BinaryOperationsToolbarState,
    reducers: {
        setBinaryOp(state: BinaryOperationsToolbarState, action: PayloadAction<BinaryOperationType>) {
            state.binaryOp = action.payload
        },
        unsetBinaryOp(state: BinaryOperationsToolbarState) {
            state.binaryOp = undefined
            state.entities = []
        },
        toggleEntitySelectionForBinaryOp(state: BinaryOperationsToolbarState, action: PayloadAction<number>) {
            if (state.entities.filter(entity => entity === action.payload).length > 0) {
                let entities = state.entities.filter(entity => entity !== action.payload)
                state.entities = entities
            }
            else {
                state.entities.push(action.payload)
            }
        },
    }
})

export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    setBinaryOp, unsetBinaryOp, toggleEntitySelectionForBinaryOp
} = BinaryOperationsToolbarSlice.actions

export const binaryOpSelector = (state: {toolbarBinaryOperations: BinaryOperationsToolbarState}) => state.toolbarBinaryOperations.binaryOp
export const binaryOpEntitiesKeysSelector = (state: {toolbarBinaryOperations: BinaryOperationsToolbarState}) => state.toolbarBinaryOperations.entities
