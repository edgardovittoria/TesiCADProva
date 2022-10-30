import {TransformationParams, updateTransformationParams} from "cad-library";
import {FC} from "react";
import {Col, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";

export const Transformations: FC<{ transformationParams: TransformationParams }> = ({transformationParams}) => {
    const dispatch = useDispatch()

    return (
        <>
            <div className="flex">
                <div className="flex mb-[10px] ml-[70px] w-full">
                    <div className="text-black text-center w-1/3">X</div>
                    <div className="text-black text-center w-1/3">Y</div>
                    <div className="text-black text-center w-1/3">Z</div>
                </div>
            </div>
            {Object.entries(transformationParams).map(([type, value]) =>
                <div key={type} className="flex justify-between">
                    <span className="text-black w-[15%]">{type}</span>
                    <div className="flex mb-[10px] justify-between pr-[15px] w-[83%]">
                        {value.map((paramValue, index) =>
                            <input key={index}
                                   type="number"
                                   step="0.1"
                                   className="border border-black rounded shadow p-1 w-[30%] text-black text-center"
                                   autoComplete="off"
                                   value={paramValue}
                                   onChange={(e) => {
                                       dispatch(updateTransformationParams(Object.keys(transformationParams).reduce((newTransfParams, typeTransf) => {
                                           newTransfParams[typeTransf as keyof TransformationParams] = [...newTransfParams[typeTransf as keyof TransformationParams]]
                                           if (typeTransf === type) {
                                               newTransfParams[typeTransf as keyof TransformationParams][index] = parseFloat(e.target.value) || 0
                                           }
                                           return newTransfParams
                                       }, {...transformationParams})))
                                   }}
                            />
                        )}
                    </div>
                </div>
            )}

        </>

    )
}