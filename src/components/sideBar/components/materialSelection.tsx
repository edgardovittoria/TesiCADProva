import { Material } from "@Draco112358/cad-library";
import { FC } from "react";
import { Col, FormSelect, Row } from "react-bootstrap";
import { useMaterials } from "./useMaterials";

interface MaterialSelectionProps {
    material?: Material
    setMaterial: Function
    unsetMaterial: Function
}

export const MaterialSelection: FC<MaterialSelectionProps> = ({ material, setMaterial, unsetMaterial }) => {
    const { availableMaterials } = useMaterials()
    return (
        <Row>
            <Col className="col-2">
                <span className="textSideBar">material</span>
            </Col>
            <Col>
                <FormSelect
                    onChange={(event) => (event.currentTarget.value !== "UNDEFINED") ? setMaterial(availableMaterials.filter(mat => mat.name === event.currentTarget.value)[0]) : unsetMaterial()}
                    defaultValue={(material !== undefined) ? material.name : "UNDEFINED"}
                    className="selectOperation"
                >
                    <option value="UNDEFINED">UNDEFINED</option>
                    {availableMaterials.map(mat => <option value={mat.name}>{mat.name}</option>)}
                </FormSelect>
            </Col>
        </Row>
    )
}