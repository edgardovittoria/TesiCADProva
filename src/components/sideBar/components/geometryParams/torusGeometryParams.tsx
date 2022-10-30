import { TorusGeometryAttributes } from "cad-library";
import { FC } from "react";
import { Col } from "react-bootstrap";
import { GeometryParamsGeneralProps } from "./geometryParams";


export const TorusGeometryParams: FC<GeometryParamsGeneralProps> = ({ entity, updateParams }) => {
    return (
        <>
            <div key="torus_radius" className="flex">
                    <span className="text-black w-[40%] text-left">torus radius</span>
                    <div className="flex mb-[10px]" style={{ width: "100%", right: 0 }}>
                        <input key="torus_radius"
                            type="number"
                            step="0.1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as TorusGeometryAttributes).torusRadius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, torusRadius: parseFloat(e.target.value) || 0 } as TorusGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="tube_radius" className="flex">
                    <span className="text-black w-[40%] text-left">tube radius</span>
                    <div className="flex mb-[10px]" style={{ width: "100%", right: 0 }}>
                        <input key="tube_radius"
                            type="number"
                            step="0.1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as TorusGeometryAttributes).tubeRadius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, tubeRadius: parseFloat(e.target.value) || 0 } as TorusGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="radial_segments" className="flex">
                    <span className="text-black w-[40%] text-left">radial segments</span>
                    <div className="flex mb-[10px]" style={{ width: "100%", right: 0 }}>
                        <input key="radial_segments"
                            type="number"
                            step="1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as TorusGeometryAttributes).radialSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, radialSegments: parseFloat(e.target.value) || 0 } as TorusGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="tubular_segments" className="flex">
                    <span className="text-black w-[40%] text-left">tubular segments</span>
                    <div className="flex mb-[10px]" style={{ width: "100%", right: 0 }}>
                        <input key="tubular_segments"
                            type="number"
                            step="1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as TorusGeometryAttributes).tubularSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, tubularSegments: parseFloat(e.target.value) || 0 } as TorusGeometryAttributes)}
                        />
                    </div>
            </div>
        </>
    )
}