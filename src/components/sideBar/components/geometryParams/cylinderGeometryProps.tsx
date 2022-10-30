import { CylinderGeometryAttributes } from "cad-library";
import { FC } from "react";
import { Col } from "react-bootstrap";
import { GeometryParamsGeneralProps } from "./geometryParams";


export const CylinderGeometryParams: FC<GeometryParamsGeneralProps> = ({ entity, updateParams }) => {
    return (
        <>
            <div key="top_radius" className="flex">
                    <span className="text-black w-[40%] text-left">top radius</span>
                    <div className="flex mb-[10px]" style={{ width: "100%", right: 0 }}>
                        <input key="top_radius"
                            type="number"
                            step="0.1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as CylinderGeometryAttributes).topRadius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, topRadius: parseFloat(e.target.value) || 0 } as CylinderGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="bottom_radius" className="flex">
                    <span className="text-black w-[40%] text-left">bottom radius</span>
                    <div className="flex mb-[10px]" style={{ width: "100%", right: 0 }}>
                        <input key="bottom_radius"
                            type="number"
                            step="0.1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as CylinderGeometryAttributes).bottomRadius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, bottomRadius: parseFloat(e.target.value) || 0 } as CylinderGeometryAttributes)}
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
                            value={(entity.geometryAttributes as CylinderGeometryAttributes).height}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, height: parseFloat(e.target.value) || 0 } as CylinderGeometryAttributes)}
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
                            value={(entity.geometryAttributes as CylinderGeometryAttributes).radialSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, radialSegments: parseFloat(e.target.value) || 0 } as CylinderGeometryAttributes)}
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
                            value={(entity.geometryAttributes as CylinderGeometryAttributes).heightSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, heightSegments: parseFloat(e.target.value) || 0 } as CylinderGeometryAttributes)}
                        />
                    </div>
            </div>
        </>
    )
}