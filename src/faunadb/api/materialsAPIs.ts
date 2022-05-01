import { Material } from "cad-library";
import {client, q} from "../client";
import {FaunaResMaterials} from "../responseModels";

export async function getMaterials() {
    try {
        const response = await client.query(
            q.Map(q.Paginate(q.Documents(q.Collection('Materials'))), q.Lambda('doc', q.Get(q.Var('doc'))))
        )
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ));
        return (response as FaunaResMaterials).data.map(d => d.data)
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function saveNewMaterial(newMaterial: Material) {
    try {
        await client.query((
            q.Create(
                q.Collection('Materials'),
                {
                    data: {
                        ...newMaterial
                    }
                }
            )
        ))
    } catch (e) {
        console.log(e)
    }
}