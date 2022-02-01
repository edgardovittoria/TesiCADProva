import { TorusGeometryAttributes } from "@Draco112358/cad-library";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { GeometryParamsGeneralProps } from "./geometryParams";


export const TorusGeometryParams: FC<GeometryParamsGeneralProps> = ({ entity, updateParams }) => {
    return (
        <>
            <Row key="torus_radius">
                <Col className="col-2">
                    <span className="textSideBar">torus radius</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="torus_radius"
                            type="number"
                            step="0.1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as TorusGeometryAttributes).torusRadius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, torusRadius: parseFloat(e.target.value) } as TorusGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
            <Row key="tube_radius">
                <Col className="col-2">
                    <span className="textSideBar">tube radius</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="tube_radius"
                            type="number"
                            step="0.1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as TorusGeometryAttributes).tubeRadius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, tubeRadius: parseFloat(e.target.value) } as TorusGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
            <Row key="radial_segments">
                <Col className="col-2">
                    <span className="textSideBar">radial segments</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="radial_segments"
                            type="number"
                            step="1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as TorusGeometryAttributes).radialSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, radialSegments: parseFloat(e.target.value) } as TorusGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
            <Row key="tubular_segments">
                <Col className="col-2">
                    <span className="textSideBar">tubular segments</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="tubular_segments"
                            type="number"
                            step="1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as TorusGeometryAttributes).tubularSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, tubularSegments: parseFloat(e.target.value) } as TorusGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}