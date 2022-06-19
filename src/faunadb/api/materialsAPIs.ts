import { Material } from "cad-library";
import faunadb from "faunadb"



export async function getMaterials(faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query) {
    const response = await faunaClient.query(
        faunaQuery.Select("data",
            faunaQuery.Map(
                faunaQuery.Paginate(faunaQuery.Match(faunaQuery.Index("materials_all"))),
                faunaQuery.Lambda("material", faunaQuery.Select("data", faunaQuery.Get(faunaQuery.Var("material"))))
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
}

export async function saveNewMaterial(faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, newMaterial: Material) {
    await faunaClient.query((
        faunaQuery.Create(
            faunaQuery.Collection('Materials'),
            {
                data: {
                    ...newMaterial
                }
            }
        )
    ))
}