import { selectComponent } from "cad-library";
import { createContext, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { CadmiaModality } from "../../models/cadmiaModality";
import { toggleEntitySelectionForBinaryOp } from "../binaryOperationsToolbar/binaryOperationsToolbarSlice";

export type ModalityManagerContextType = {
  modality: CadmiaModality;
  setModality: Function;
  onClickActionForMeshBasedOnModality: Function;
};

export const ModalityManagerContext = createContext<ModalityManagerContextType>(
  {
    modality: CadmiaModality.NormalSelection,
    setModality: (f: any) => f,
    onClickActionForMeshBasedOnModality: (f: any) => f,
  }
);

export const ModalityManagerProvider: FC<{}> = ({ children }) => {
  const [modality, setModality] = useState(CadmiaModality.NormalSelection);
  const dispatch = useDispatch();
  const onClickActionForMeshBasedOnModality = (f: any) => {
    if (modality === CadmiaModality.NormalSelection) {
      f.selectedComponentKey !== f.keyComponent &&
        dispatch(selectComponent(f.keyComponent));
    } else if (modality === CadmiaModality.BinaryOperation) {
      dispatch(toggleEntitySelectionForBinaryOp(f.keyComponent));
    }
  };

  return (
    <ModalityManagerContext.Provider
      value={
        {
          modality: modality,
          setModality: setModality,
          onClickActionForMeshBasedOnModality:
            onClickActionForMeshBasedOnModality,
        } as ModalityManagerContextType
      }
    >
      {children}
    </ModalityManagerContext.Provider>
  );
};
