import { CylinderGeometryAttributes } from "@Draco112358/cad-library";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { GeometryParamsGeneralProps } from "./geometryParams";


export const CylinderGeometryParams: FC<GeometryParamsGeneralProps> = ({ entity, updateParams }) => {
    return (
        <>
            <Row key="top_radius">
                <Col className="col-2">
                    <span className="textSideBar">top radius</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="top_radius"
                            type="number"
                            step="0.1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as CylinderGeometryAttributes).topRadius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, topRadius: parseFloat(e.target.value) } as CylinderGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
            <Row key="bottom_radius">
                <Col className="col-2">
                    <span className="textSideBar">bottom radius</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="bottom_radius"
                            type="number"
                            step="0.1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as CylinderGeometryAttributes).bottomRadius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, bottomRadius: parseFloat(e.target.value) } as CylinderGeometryAttributes)}
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
                            value={(entity.geometryAttributes as CylinderGeometryAttributes).height}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, height: parseFloat(e.target.value) } as CylinderGeometryAttributes)}
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
                            value={(entity.geometryAttributes as CylinderGeometryAttributes).radialSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, radialSegments: parseFloat(e.target.value) } as CylinderGeometryAttributes)}
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
                            value={(entity.geometryAttributes as CylinderGeometryAttributes).heightSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, heightSegments: parseFloat(e.target.value) } as CylinderGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}