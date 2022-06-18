import { faunaClient, faunaQuery, Material } from "cad-library";

export async function getMaterials() {
    try {
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
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function saveNewMaterial(newMaterial: Material) {
    try {
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
    } catch (e) {
        console.log(e)
    }
}