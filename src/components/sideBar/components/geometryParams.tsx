import { ComponentEntity, CubeGeometryAttributes, updateEntityGeometryParams } from "@Draco112358/cad-library";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

interface GeometryParamsProps {
    entity: ComponentEntity
}

export const GeometryParams: FC<GeometryParamsProps> = ({ entity }) => {
    const dispatch = useDispatch()
    return (
        <>
            {(entity.type === "CUBE") &&
                <>
                    <Row key="width">
                        <Col className="col-2">
                            <span className="textSideBar">width</span>
                        </Col>
                        <Col>
                            <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                                <input key="width"
                                    type="number"
                                    step="0.1"
                                    className="Number"
                                    autoComplete="off"
                                    value={(entity.geometryAttributes as CubeGeometryAttributes).width}
                                    onChange={(e) => dispatch(updateEntityGeometryParams({ ...entity.geometryAttributes, width: parseFloat(e.target.value) } as CubeGeometryAttributes))}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row key="heigth">
                        <Col className="col-2">
                            <span className="textSideBar">heigth</span>
                        </Col>
                        <Col>
                            <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                                <input key="height"
                                    type="number"
                                    step="0.1"
                                    className="Number"
                                    autoComplete="off"
                                    value={(entity.geometryAttributes as CubeGeometryAttributes).height}
                                    onChange={(e) => dispatch(updateEntityGeometryParams({ ...entity.geometryAttributes, height: parseFloat(e.target.value) } as CubeGeometryAttributes))}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row key="depth">
                        <Col className="col-2">
                            <span className="textSideBar">depth</span>
                        </Col>
                        <Col>
                            <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                                <input key="depth"
                                    type="number"
                                    step="0.1"
                                    className="Number"
                                    autoComplete="off"
                                    value={(entity.geometryAttributes as CubeGeometryAttributes).depth}
                                    onChange={(e) => dispatch(updateEntityGeometryParams({ ...entity.geometryAttributes, depth: parseFloat(e.target.value) } as CubeGeometryAttributes))}
                                />
                            </div>
                        </Col>
                    </Row>
                </>
            }
        </>
    )
}