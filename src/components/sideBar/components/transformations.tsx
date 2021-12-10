import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { TransformationParamDetails, TransformationParams } from "../../../model/ComponentEntity";
import { updateTransformationParams } from "../../../store/canvasSlice";

export const Transformations: FC<{ transformationParams: TransformationParams }> = ({ transformationParams }) => {
    const dispatch = useDispatch()

    const setValueTransformationItem = (type: string, positionItemValue: number, indexPositionItem: number) => {
        let transfTemp = {...transformationParams}
         let item: TransformationParamDetails = [...transfTemp[type as keyof TransformationParams]]
         item[indexPositionItem] = positionItemValue
         transfTemp[type as keyof TransformationParams] = item
        dispatch(updateTransformationParams(transfTemp))
    }

    return (
        <>
            {Object.entries(transformationParams).map(([type, value]) =>
                <Row key={type}>
                    <Col className="col-2">
                        <span className="textSideBar">{type}</span>
                    </Col>
                    <Col>
                        <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                            {value.map((paramValue, index) => <InputElement key={index} type={type} coordinate={paramValue} setCoordinate={setValueTransformationItem} axisIndex={index} />)}
                        </div>
                    </Col>
                </Row>
            )}

        </>

    )
}


const InputElement: FC<{ type: string, axisIndex: number, coordinate: number, setCoordinate: Function }> = ({ coordinate, setCoordinate, axisIndex, type }) => {

    return (
        <input type="number"
            step="0.1"
            className="Number"
            autoComplete="off"
            value={coordinate}
            onChange={(e) => {
                setCoordinate(type, parseFloat(e.target.value), axisIndex);
            }}
        />
    )
}