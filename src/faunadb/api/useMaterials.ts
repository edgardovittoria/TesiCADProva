import { Material, useFaunaQuery } from "cad-library";
import {useEffect, useState} from "react";
import { getMaterials } from "./materialsAPIs";

export const useMaterials = () => {
    const [availableMaterials, setAvailableMaterials] = useState<Material[]>([]);
    const {execQuery} = useFaunaQuery()

    useEffect(() => {
        execQuery(getMaterials)?.then(res => setAvailableMaterials(res as Material[]))
    }, []);

    return {availableMaterials}
}