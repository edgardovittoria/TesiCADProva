import {Listbox, Transition} from "@headlessui/react";
import {Material} from "cad-library";
import React, {FC, Fragment} from "react";
import {useMaterials} from "../../../faunadb/api/useMaterials";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";

interface MaterialSelectionProps {
    defaultMaterial?: Material
    setMaterial: (value: Material) => void
    unsetMaterial: Function
}

export const MaterialSelection: FC<MaterialSelectionProps> = ({defaultMaterial, setMaterial, unsetMaterial}) => {
    const {availableMaterials} = useMaterials()
    return (
        <div className="flex flex-col">
            <h6 className="text-black mt-[20px]">Material</h6>
            <hr className="text-black"/>
            <Listbox value={defaultMaterial} onChange={setMaterial}>
                <div className="relative mt-1">
                    <Listbox.Button
                        className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate text-black">{(defaultMaterial) ? defaultMaterial.name : "UNDEFINED"}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute mt-[-190px] max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {availableMaterials.map((material, materialIdx) => (
                                <Listbox.Option
                                    key={materialIdx}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={material}
                                >
                                    {({selected}) => (
                                        <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {material.name}
                      </span>
                                            {selected ? (
                                                <span
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
            {/*<FormSelect
                onChange={(event) => (event.currentTarget.value !== "UNDEFINED" && availableMaterials) ? setMaterial(availableMaterials.filter(mat => mat.name === event.currentTarget.value)[0]) : unsetMaterial()}
                defaultValue={(defaultMaterial !== undefined) ? defaultMaterial.name : "UNDEFINED"}
                className="selectOperation"
                value={(defaultMaterial !== undefined) ? defaultMaterial.name : "UNDEFINED"}
            >
                <option value="UNDEFINED">UNDEFINED</option>
                {(availableMaterials) && availableMaterials.map(mat => <option key={mat.name}
                                                                               value={mat.name}>{mat.name}</option>)}
            </FormSelect>*/}
        </div>
    )
}