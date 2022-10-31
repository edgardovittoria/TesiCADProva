import React, {Fragment, useRef} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Popover, Transition, Switch} from "@headlessui/react";
import {ChevronDownIcon, ArrowRightOnRectangleIcon} from "@heroicons/react/20/solid";
import {
    addComponent, CanvasState,
    canvasStateSelector, ComponentEntity,
    componentseSelector, exportToSTL,
    getDefaultCone,
    getDefaultCube,
    getDefaultCylinder,
    getDefaultSphere,
    getDefaultTorus,
    ImportActionParamsObject,
    ImportCadProjectButton,
    importFromCadSTL,
    importStateCanvas,
    numberOfGeneratedKeySelector,
    resetState
} from "cad-library";
import {useDispatch, useSelector} from "react-redux";
import {UndoRedo} from "./components/undoRedo";
import {ActionCreators} from "redux-undo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCircle, faCube, faRing, faTrash} from "@fortawesome/free-solid-svg-icons";
import {exportProjectFrom} from "../../auxiliaryFunctionsForImportAndExport/exportFunctions";

interface NavbarProps {
    showModalSave: Function,
    showModalLoading: Function,
    setViewElementVisibility: Function,
    sideBarChecked: boolean,
    setSideBarChecked: Function,
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const exportJSONProject = (canvas: CanvasState) => {
    const link = document.createElement('a');
    link.href = `data:application/json;charset=utf-8,${encodeURIComponent(
        exportProjectFrom(canvas)
    )}`
    link.download = "project.json"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const exportToSTLFormat = (components: ComponentEntity[]) => {
    const link = document.createElement('a');
    link.href = `data:model/stl;charset=utf-8,${encodeURIComponent(
        exportToSTL(components)
    )}`
    link.download = "model.stl"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const Navbar: React.FC<NavbarProps> = (
    {
        showModalSave, showModalLoading, setSideBarChecked, sideBarChecked, setViewElementVisibility
    }
) => {

    const dispatch = useDispatch()
    const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector)
    const canvasState = useSelector(canvasStateSelector)
    const entities = useSelector(componentseSelector)


    const inputRefSTL = useRef(null)
    const onImportSTLClick = () => {
        let input = inputRefSTL.current
        if (input) {
            (input as HTMLInputElement).click()
        }

    };

    const {loginWithRedirect, isAuthenticated, logout, user} = useAuth0();


    return (
        <Popover className="relative bg-white max-h-[100px]">
            <div className="mx-auto w-full px-6">
                <div className="flex items-center justify-between border-b-2 border-gray-100 py-2">
                    <div className="flex justify-start w-0 flex-1">
                        <span className="text-2xl">
                            CADmIA
                        </span>
                    </div>
                    <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                        <Popover className="relative">
                            {({open}) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-900' : 'text-gray-500',
                                            'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900'
                                        )}
                                    >
                                        <span>File</span>
                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-600' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                                            <div
                                                className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    {isAuthenticated ?
                                                        <span
                                                            className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
                                                            onClick={() => showModalSave(true)}
                                                        >
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900">Save To DB</p>
                                                            </div>
                                                        </span>
                                                        :
                                                        <span
                                                            className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"

                                                        >
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-300">Save To DB</p>
                                                            </div>
                                                        </span>
                                                    }
                                                    {isAuthenticated ?
                                                        <span
                                                            className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
                                                            onClick={() => showModalLoading(true)}
                                                        >
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900">Load From DB</p>
                                                            </div>
                                                        </span>
                                                        :
                                                        <span
                                                            className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"

                                                        >
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-300">Load From DB</p>
                                                            </div>
                                                        </span>
                                                    }
                                                    <ImportCadProjectButton
                                                        className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
                                                        actionParams={{} as ImportActionParamsObject}
                                                        importAction={importStateCanvas}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-gray-900">Import
                                                                Project</p>
                                                        </div>
                                                    </ImportCadProjectButton>
                                                    <div
                                                        className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
                                                        onClick={onImportSTLClick}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-gray-900">Import
                                                                STL file</p>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            ref={inputRefSTL}
                                                            style={{display: "none"}}
                                                            accept=".stl"
                                                            onChange={(e) => {
                                                                let STLFiles = e.target.files;
                                                                (STLFiles) && importFromCadSTL(STLFiles[0], numberOfGeneratedKey, dispatch)
                                                            }}/>
                                                    </div>
                                                    <span
                                                        className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
                                                        onClick={() => {
                                                            exportJSONProject(canvasState)
                                                        }}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-gray-900">Export Project</p>
                                                        </div>
                                                    </span>
                                                    <span
                                                        className="-m-3 flex items-start rounded-lg p-2 hover:bg-gray-50"
                                                        onClick={() => {
                                                            exportToSTLFormat(entities)
                                                        }}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-gray-900">Export STL Format</p>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                        <Popover className="relative">
                            {({open}) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-900' : 'text-gray-500',
                                            'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900'
                                        )}
                                    >
                                        <span>View</span>
                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-600' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                                            <div
                                                className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    <span onClick={() => {
                                                        setSideBarChecked(!sideBarChecked)
                                                        setViewElementVisibility("SIDEBAR", !sideBarChecked)
                                                    }}>
                                                        <div id="viewDropdown">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-900 text-base font-medium">Object Details</span>
                                                                <div>
                                                                    <Switch
                                                                        checked={sideBarChecked}
                                                                        onChange={setSideBarChecked as (checked: boolean) => void}
                                                                        className={`${sideBarChecked ? 'bg-teal-900' : 'bg-teal-700'} relative inline-flex h-[18px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                                    >
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className={`${sideBarChecked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                                        />
                                                                    </Switch>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>


                        <Popover className="relative">
                            {({open}) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-900' : 'text-gray-500',
                                            'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900'
                                        )}
                                    >
                                        <span>Edit</span>
                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-600' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                                            <div
                                                className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    <UndoRedo/>
                                                    <div onClick={() => {
                                                        dispatch(resetState())
                                                        dispatch(ActionCreators.clearHistory())
                                                    }}>

                                                        <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                                                            <FontAwesomeIcon icon={faTrash} className="text-gray-900 mr-5"/>
                                                            <span className="text-gray-900 text-base font-medium">Clear All</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                        <Popover className="relative">
                            {({open}) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-900' : 'text-gray-500',
                                            'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900'
                                        )}
                                    >
                                        <span>Components</span>
                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-600' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                                            <div
                                                className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    <div onClick={() => {
                                                        let cube = getDefaultCube(numberOfGeneratedKey, dispatch);
                                                        dispatch(addComponent(cube))

                                                    }}>
                                                        <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                                                            <FontAwesomeIcon icon={faCube} className="text-gray-900 mr-5"/>
                                                            <span className="text-gray-900 text-base font-medium">Cube</span>
                                                        </div>

                                                    </div>
                                                    <div onClick={() => {
                                                        let sphere = getDefaultSphere(numberOfGeneratedKey, dispatch);
                                                        dispatch(addComponent(sphere))

                                                    }}>
                                                        <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                                                            <FontAwesomeIcon icon={faCircle} className="text-gray-900 mr-5"/>
                                                            <span className="text-gray-900 text-base font-medium">Sphere</span>
                                                        </div>
                                                    </div>
                                                    <div onClick={() => {
                                                        let cylinder = getDefaultCylinder(numberOfGeneratedKey, dispatch);
                                                        dispatch(addComponent(cylinder))

                                                    }}>
                                                        <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                                                            <FontAwesomeIcon icon={faCircle} className="text-gray-900 mr-5"/>
                                                            <span className="text-gray-900 text-base font-medium">Cylinder</span>
                                                        </div>

                                                    </div>
                                                    <div onClick={() => {
                                                        let torus = getDefaultTorus(numberOfGeneratedKey, dispatch);
                                                        dispatch(addComponent(torus))

                                                    }}>
                                                        <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                                                            <FontAwesomeIcon icon={faRing} className="text-gray-900 mr-5"/>
                                                            <span className="text-gray-900 text-base font-medium">Torus</span>
                                                        </div>

                                                    </div>
                                                    <div onClick={() => {
                                                        let cone = getDefaultCone(numberOfGeneratedKey, dispatch);
                                                        dispatch(addComponent(cone))

                                                    }}>
                                                        <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                                                            <FontAwesomeIcon icon={faCaretDown} size="lg" className="text-gray-900 mr-5"/>
                                                            <span className="text-gray-900 text-base font-medium">Cone</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </Popover.Group>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        {isAuthenticated
                            ? <div className="flex">
                                <Popover className="relative">
                                    {({open}) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    open ? 'text-gray-900' : 'text-gray-500',
                                                    'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900'
                                                )}
                                            >
                                                <span>{user?.name}</span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? 'text-gray-600' : 'text-gray-400',
                                                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1"
                                            >
                                                <Popover.Panel
                                                    className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                                                    <div
                                                        className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                            <div
                                                                className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50 hover:cursor-pointer"
                                                                onClick={() => logout({returnTo: window.location.origin})}
                                                            >
                                                                <ArrowRightOnRectangleIcon className="text-gray-900 mr-5 h-5 w-5"/>
                                                                <span className="text-gray-900 text-base font-medium">Log out</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </div>


                            : <div
                                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-500 px-3 py-1 text-base font-medium text-white shadow-sm hover:bg-gray-400 hover:cursor-pointer"
                                onClick={() => loginWithRedirect()}
                            >
                               Sign in
                            </div>
                        }

                    </div>
                </div>
            </div>
        </Popover>
    )
}
