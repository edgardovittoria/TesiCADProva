import {Dispatch} from "@reduxjs/toolkit";
import {RootState} from "../store/store";
import { importStateCanvas } from "@Draco112358/cad-library";

export const importProjectFrom = (file: File, dispatch: Dispatch) => {
    file.text().then((value) => {
        let storeState: RootState = JSON.parse(value)
        dispatch(importStateCanvas(storeState.canvas.present))
    })
}
