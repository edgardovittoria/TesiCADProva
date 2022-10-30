import { ConeGeometryAttributes } from "cad-library";
import { FC } from "react";
import { Col } from "react-bootstrap";
import { GeometryParamsGeneralProps } from "./geometryParams";


export const ConeGeometryParams: FC<GeometryParamsGeneralProps> = ({ entity, updateParams }) => {
    return (
        <>
            <div key="base radius" className="flex">
                    <span className="text-black w-[40%] text-left">base radius</span>
                    <div className="flex mb-[10px]" style={{ width: "100%", right: 0 }}>
                        <input key="base_radius"
                            type="number"
                            step="0.1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as ConeGeometryAttributes).radius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, radius: parseFloat(e.target.value) || 0 } as ConeGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="heigth" className="flex">
                    <span className="text-black w-[40%] text-left">heigth</span>
                    <div className="flex mb-[10px]" style={{ width: "100%", right: 0 }}>
                        <input key="heigth"
                            type="number"
                            step="0.1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as ConeGeometryAttributes).height}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, height: parseFloat(e.target.value) || 0 } as ConeGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="radial segments" className="flex">
                    <span className="text-black w-[40%] text-left">radial segments</span>
                    <div className="flex mb-[10px]" style={{ width: "100%", right: 0 }}>
                        <input key="radial_segments"
                            type="number"
                            step="1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as ConeGeometryAttributes).radialSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, radialSegments: parseFloat(e.target.value) || 0 } as ConeGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="heigth segments" className="flex">
                    <span className="text-black w-[40%] text-left">heigth segments</span>
                    <div className="flex mb-[10px]" style={{ width: "100%", right: 0 }}>
                        <input key="heigth_segments"
                            type="number"
                            step="1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as ConeGeometryAttributes).heightSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, heightSegments: parseFloat(e.target.value) || 0 } as ConeGeometryAttributes)}
                        />
                    </div>
            </div>
        </>
    )
}