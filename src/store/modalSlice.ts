import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Box3} from "three";
import {ComponentEntity} from "../model/ComponentEntity";

type Modal = {
    name: string,
    currentOpen: boolean,
    previousOpen: boolean,
    lastValue: string,
}

export type ModalState = {
    modals: Modal[]
}

export const ModalStateSlice = createSlice({
    name: 'modal',
    initialState: {
        modals: [{
            name: "BINARY_OP",
            previousOpen: false,
            currentOpen: false,
            lastValue: "SUBTRACTION",
        }]
    } as ModalState,
    reducers: {
        openModal(modalState: ModalState, action: PayloadAction<string>){
            modalState.modals = modalState.modals.map(modal => {
                if(modal.name === action.payload){
                    modal.previousOpen = modal.currentOpen
                    modal.currentOpen = true
                }
                return modal
            })
        },
        closeModal(modalState: ModalState, action: PayloadAction<string>){
            modalState.modals = modalState.modals.map(modal => {
                if(modal.name === action.payload){
                    modal.previousOpen = modal.currentOpen
                    modal.currentOpen = false
                }
                return modal
            })
        },
        updateLastValue(modalState: ModalState, action: PayloadAction<{ name: string, value: string }>){
            modalState.modals = modalState.modals.map(modal => {
                if(modal.name === action.payload.name){
                    modal.lastValue = action.payload.value
                }
                return modal
            })
        }
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
}
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    openModal, closeModal, updateLastValue
} = ModalStateSlice.actions

export const modalStateSelector = (state: { modal: ModalState }) => state.modal;
export const specificModalStateSelector = (name: string, state: { modal: ModalState }) => state.modal.modals.filter(modal => modal.name === name)[0];
