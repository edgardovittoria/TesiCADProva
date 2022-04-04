import { SphereGeometryAttributes } from "cad-library";
import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { GeometryParamsGeneralProps } from "./geometryParams";


export const SphereGeometryParams: FC<GeometryParamsGeneralProps> = ({ entity, updateParams }) => {
    return (
        <>
            <Row key="radius">
                <Col className="col-2">
                    <span className="textSideBar">radius</span>
                </Col>
                <Col>
                    <div className="Row transformation" style={{ width: "100%", right: 0 }}>
                        <input key="radius"
                            type="number"
                            step="0.1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as SphereGeometryAttributes).radius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, radius: parseFloat(e.target.value) || 0 } as SphereGeometryAttributes)}
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
                            value={(entity.geometryAttributes as SphereGeometryAttributes).widthSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, widthSegments: parseFloat(e.target.value) || 0 } as SphereGeometryAttributes)}
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
                        <input key="heigth_segments"
                            type="number"
                            step="1"
                            className="Number"
                            autoComplete="off"
                            value={(entity.geometryAttributes as SphereGeometryAttributes).heightSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, heightSegments: parseFloat(e.target.value) || 0 } as SphereGeometryAttributes)}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}