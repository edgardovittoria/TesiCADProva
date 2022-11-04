import { useAuth0 } from '@auth0/auth0-react'
import { canvasStateSelector, FaunaCadModel, saveNewModel, useFaunaQuery } from 'cad-library'
import {FC, Fragment, useState} from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Transition, Dialog } from '@headlessui/react'

export const SaveModelWithNameModal: FC<{ showModalSave: Function }> = ({ showModalSave }) => {
    const [name, setName] = useState("")
    const { user } = useAuth0()
    const canvas = useSelector(canvasStateSelector)
    const {execQuery} = useFaunaQuery()

    const saveModel = async () => {
        let newModel = {
            name: name,
            components: canvas.components,
            owner_id: user?.sub,
            owner: user?.name
        } as FaunaCadModel
        await execQuery(saveNewModel,newModel)
    }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => showModalSave(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Save Model to database
                                </Dialog.Title>
                                <div className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <label className="ml-2">Name:</label>
                                        <input
                                            type="text"
                                            value={name}
                                            required
                                            onChange={(e) => { setName(e.target.value) }}
                                            className="border border-black rounded shadow p-1 w-[80%] text-black text-left"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => showModalSave(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={(name === "") ?
                                            () => { toast.error("You must insert a valid name for the model.") }
                                            :
                                            () => {
                                                showModalSave(false)
                                                saveModel()
                                            }
                                        }
                                    >
                                        Save
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}