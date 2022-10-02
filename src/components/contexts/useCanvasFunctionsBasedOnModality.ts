import { useContext } from "react"
import { ModalityManagerContext } from "./modalityManagerProvider"

export const useCanvasFunctionsBasedOnModality = () => {
    const {onClickActionForMeshBasedOnModality} = useContext(ModalityManagerContext)
    return  {onClickActionForMeshBasedOnModality}
}