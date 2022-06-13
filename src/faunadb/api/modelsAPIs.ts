import { ComponentEntity } from "cad-library";
import toast from "react-hot-toast";
import { client, q } from "../client";

export type FaunaCadModel = {
    name: string,
    components: ComponentEntity[],
    owner_id: string,
    owner: string
}

export async function saveNewModel(newModel: FaunaCadModel) {
    try {
        await client.query((
            q.Create(
                q.Collection('Models'),
                {
                    data: {
                        ...newModel
                    }
                }
            )
        ))
        toast.success("Model successfully saved!")
    } catch (e) {
        toast.error("Model not saved! See console log for error details.")
        console.log(e)
    }
}

export const getModelsByOwner = async (owner_id: string) => {
    try {
        const response = await client.query(
            q.Select("data",
                q.Map(
                    q.Paginate(q.Match(q.Index("models_by_owner"), owner_id)),
                    q.Lambda("model", q.Select("data", q.Get(q.Var("model"))))
                )
            )
        )
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ));
        return response as FaunaCadModel[]
    }catch (e) {
        console.log(e)
        return {} as [];
    }
}