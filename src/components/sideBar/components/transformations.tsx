import { TransformationParams, updateTransformationParams } from "@Draco112358/cad-library";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

export const Transformations: FC<{ transformationParams: TransformationParams }> = ({ transformationParams }) => {
    const dispatch = useDispatch()

    return (
        <>
            {Object.entries(transformationParams).map(([type, value]) =>
                <Row key={type}>
                    <Col className="col-2">
                        <span className="textSideBar">{type}</span>
                    </Col>
                    <Col>
                        <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                            {value.map((paramValue, index) =>
                                <input key={index}
                                    type="number"
                                    step="0.1"
                                    className="Number"
                                    autoComplete="off"
                                    value={paramValue}
                                    onChange={(e) => {
                                        dispatch(updateTransformationParams(Object.keys(transformationParams).reduce((newTransfParams, typeTransf) => {
                                            newTransfParams[typeTransf as keyof TransformationParams] = [...newTransfParams[typeTransf as keyof TransformationParams]]
                                            if (typeTransf === type) { newTransfParams[typeTransf as keyof TransformationParams][index] = parseFloat(e.target.value) }
                                            return newTransfParams
                                        }, { ...transformationParams })))
                                    }}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            )}

        </>

    )
}