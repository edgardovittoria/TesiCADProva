import { useContext } from "react"
import { ModalityManagerContext } from "./modalityManagerProvider"

export const useCadmiaModality = () => {
    const {modality, setModality} = useContext(ModalityManagerContext)
    return {modality, setModality}
}