import { SphereGeometryAttributes } from "cad-library";
import { FC } from "react";
import { Col } from "react-bootstrap";
import { GeometryParamsGeneralProps } from "./geometryParams";


export const SphereGeometryParams: FC<GeometryParamsGeneralProps> = ({ entity, updateParams }) => {
    return (
        <>
            <div key="radius" className="flex">
                    <span className="text-black w-[40%] text-left">radius</span>
                    <div className="flex mb-[10px]">
                        <input key="radius"
                            type="number"
                            step="0.1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as SphereGeometryAttributes).radius}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, radius: parseFloat(e.target.value) || 0 } as SphereGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="width_segments" className="flex">
                    <span className="text-black w-[40%] text-left">width segments</span>
                    <div className="flex mb-[10px]">
                        <input key="width_segments"
                            type="number"
                            step="1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as SphereGeometryAttributes).widthSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, widthSegments: parseFloat(e.target.value) || 0 } as SphereGeometryAttributes)}
                        />
                    </div>
            </div>
            <div key="heigth_segments" className="flex">
                    <span className="text-black w-[40%] text-left">heigth segments</span>
                    <div className="flex mb-[10px]">
                        <input key="heigth_segments"
                            type="number"
                            step="1"
                            className="border border-black rounded shadow p-1 w-[50%] text-black text-center"
                            autoComplete="off"
                            value={(entity.geometryAttributes as SphereGeometryAttributes).heightSegments}
                            onChange={(e) => updateParams({ ...entity.geometryAttributes, heightSegments: parseFloat(e.target.value) || 0 } as SphereGeometryAttributes)}
                        />
                    </div>
            </div>
        </>
    )
}