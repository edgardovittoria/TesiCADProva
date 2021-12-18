import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    keySelectedComponenteSelector,
    lastActionTypeSelector,
    lengthFutureStateSelector,
    lengthPastStateSelector, removeComponent, resetState,
} from "../../store/canvasSlice";
import {redoFunction, undoFunction} from "../../components/navBar/components/undoRedo";
import {exportProjectFrom} from "../../auxiliaryFunctionsForImportAndExport/exportFunctions";
import {store} from "../../store/store";
import {exportJSONProject, exportToSTLFormat} from "../../components/navBar/navBar";
import {useMeshes} from "../../components/contexts/useMeshes";

interface KeyboardEventMapperProps {
    sideBarChecked: boolean,
    setSideBarChecked: Function,
    setViewElementVisibility: Function
}

export const KeyboardEventMapper: React.FC<KeyboardEventMapperProps> = ({setSideBarChecked, sideBarChecked, setViewElementVisibility}) => {

    const dispatch = useDispatch();
    const pastStateLength = useSelector(lengthPastStateSelector)
    const futureStateLength = useSelector(lengthFutureStateSelector)
    const lastActionType = useSelector(lastActionTypeSelector)
    const [undoActions, setundoActions] = useState<string[]>([])

    const selectedComponentKey = useSelector(keySelectedComponenteSelector)

    const {meshes} = useMeshes()

    function KeyPress(e: KeyboardEvent) {
        // undo last action
        if(e.ctrlKey && e.key === 'z' && pastStateLength > 0){
            e.preventDefault()
            undoFunction(lastActionType, undoActions, setundoActions, dispatch)
        }
        // redo last action
        if(e.ctrlKey && e.key === 'x' && futureStateLength > 0){
            e.preventDefault()
            redoFunction(undoActions, setundoActions, dispatch)
        }
        //delete all components from canvas
        if(e.ctrlKey && e.altKey && e.key === 'r'){
            e.preventDefault()
            dispatch(resetState())
        }
        //delete selected component
        if(e.key === 'Delete' && selectedComponentKey !== 0){
            e.preventDefault()
            dispatch(removeComponent(selectedComponentKey))
        }
        //set sidebar visibility
        if(e.ctrlKey && e.key === 'd'){
            e.preventDefault()
            setSideBarChecked(!sideBarChecked)
            setViewElementVisibility('SIDEBAR', !sideBarChecked)
        }
        //export JSON project
        if(e.ctrlKey && !e.altKey && e.key === 's'){
            e.preventDefault()
            if(window.confirm('Do you want to export the project in json format?')){
                exportJSONProject()
            }
        }
        //export JSON project
        if(e.ctrlKey && e.altKey && e.key === 's'){
            e.preventDefault()
            if(window.confirm('Do you want to export the project in STL format?')){
                exportToSTLFormat(meshes)
            }
        }
    }

    window.onkeydown = KeyPress

    return null

}