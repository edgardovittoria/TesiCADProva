import { Material } from "cad-library";
import {useEffect, useState} from "react";
import { getMaterials } from "../../../faunadb/api/materialsAPIs";

export const useMaterials = () => {
    const [availableMaterials, setAvailableMaterials] = useState<Material[]>([]);

    useEffect(() => {
        getMaterials().then(res => setAvailableMaterials(res as Material[]))
    }, []);

    return {availableMaterials}
}