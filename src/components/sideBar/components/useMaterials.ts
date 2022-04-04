import { Material } from "cad-library";
import {useEffect, useState} from "react";
import { getMaterials } from "../../../api/getMaterials";

export const useMaterials = () => {
    const [availableMaterials, setAvailableMaterials] = useState<Material[]>([]);

    useEffect(() => {
        getMaterials().then(res => setAvailableMaterials(res))
    }, []);

    return {availableMaterials}
}