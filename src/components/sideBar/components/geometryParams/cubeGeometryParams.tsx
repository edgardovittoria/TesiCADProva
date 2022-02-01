import { CubeGeometryAttributes } from "@Draco112358/cad-library";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { GeometryParamsGeneralProps } from "./geometryParams";

export const CubeGeometryParams: FC<GeometryParamsGeneralProps> = ({ entity, updateParams }) => {
    return (
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
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, width: parseFloat(e.target.value) } as CubeGeometryAttributes)}
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
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, height: parseFloat(e.target.value) } as CubeGeometryAttributes)}
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
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, depth: parseFloat(e.target.value) } as CubeGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
            <Row key="width_segments">
                <Col className="col-2">
                    <span className="textSideBar">width segments</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="width_segments"
                            type="number"
                            step="1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as CubeGeometryAttributes).widthSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, widthSegments: parseFloat(e.target.value) } as CubeGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
            <Row key="heigth_segments">
                <Col className="col-2">
                    <span className="textSideBar">heigth segments</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="height_segments"
                            type="number"
                            step="1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as CubeGeometryAttributes).heigthSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, heigthSegments: parseFloat(e.target.value) } as CubeGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
            <Row key="depth_segments">
                <Col className="col-2">
                    <span className="textSideBar">depth segments</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="depth_segments"
                            type="number"
                            step="1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as CubeGeometryAttributes).depthSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, depthSegments: parseFloat(e.target.value) } as CubeGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}