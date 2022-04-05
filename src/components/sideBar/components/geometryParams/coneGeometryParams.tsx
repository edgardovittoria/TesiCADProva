import { ConeGeometryAttributes } from "cad-library";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { GeometryParamsGeneralProps } from "./geometryParams";


export const ConeGeometryParams: FC<GeometryParamsGeneralProps> = ({ entity, updateParams }) => {
    return (
        <>
            <Row key="base radius">
                <Col className="col-2">
                    <span className="textSideBar">base radius</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="base_radius"
                            type="number"
                            step="0.1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as ConeGeometryAttributes).radius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, radius: parseFloat(e.target.value) || 0 } as ConeGeometryAttributes)}
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
                        <input key="heigth"
                            type="number"
                            step="0.1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as ConeGeometryAttributes).height}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, height: parseFloat(e.target.value) || 0 } as ConeGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
            <Row key="radial segments">
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
                            value={(entity.geometryAttributes as ConeGeometryAttributes).radialSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, radialSegments: parseFloat(e.target.value) || 0 } as ConeGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
            <Row key="heigth segments">
                <Col className="col-2">
                    <span className="textSideBar">heigth segments</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="heigth_segments"
                            type="number"
                            step="1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as ConeGeometryAttributes).heightSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, heightSegments: parseFloat(e.target.value) || 0 } as ConeGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}