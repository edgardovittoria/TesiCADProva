import { Material } from "cad-library";
import { client, q } from "../client";

export async function getMaterials() {
    try {
        const response = await client.query(
            q.Select("data",
                q.Map(
                    q.Paginate(q.Match(q.Index("materials_all"))),
                    q.Lambda("material", q.Select("data", q.Get(q.Var("material"))))
                )
            )
        )
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ));
        return response as Material[]
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