import {useEffect, useState} from "react";
import "./App.css";
import "./GlobalColors.css";
import {MyCanvas} from "./components/canvas/MyCanvas";
import {ToolBar} from "./components/toolBar/toolBar";
import {KeyboardEventMapper} from "./utils/keyboardEventMapper/keyboardEventMapper";
import "react-statusbar/dist/statusbar.css";
import * as Statusbar from "react-statusbar";
import {SaveModelWithNameModal} from "./components/navBar/components/modals/saveModelWithNameModal";
import {
    CanvasState,
    ImportActionParamsObject,
    ImportModelFromDBModal,
    importStateCanvas,
    SetUserInfo,
} from "cad-library";
import {useAuth0} from "@auth0/auth0-react";
import {BinaryOpsToolbar} from "./components/binaryOperationsToolbar/binaryOpsToolbar";
import {MiscToolbar} from "./components/miscToolbar/miscToolbar";
import {Navbar} from "./components/navBar/NavBar";
import {Sidebar} from "./components/sideBar/Sidebar";

export let token = "";

function App() {
    const [sideBar, setSideBar] = useState(false);
    const [unit, setUnit] = useState("cm");
    const [modalSave, setModalSave] = useState(false);
    const [modalLoad, setModalLoad] = useState(false);

    const showViewElementVisibility = (element: string, visibility: boolean) => {
        switch (element) {
            case "SIDEBAR":
                setSideBar(visibility);
                break;
        }
    };

    const {user, getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        const getToken = async () => {
            const tok = await getAccessTokenSilently();
            return tok;
        };
        user &&
        getToken().then((tok) => {
            token = tok;
        });
    }, [user]);

    return (
        <>
            <div className="m-0 h-full">
                <SetUserInfo/>
                <Navbar
                    setViewElementVisibility={showViewElementVisibility}
                    sideBarChecked={sideBar}
                    setSideBarChecked={setSideBar}
                    showModalSave={setModalSave}
                    showModalLoading={setModalLoad}
                />
                <KeyboardEventMapper
                    setViewElementVisibility={showViewElementVisibility}
                    sideBarChecked={sideBar}
                    setSideBarChecked={setSideBar}
                />
                <div className="w-full p-0 relative">
                    <MyCanvas/>
                    <ToolBar/>
                    <BinaryOpsToolbar/>
                    <MiscToolbar/>
                    {modalSave && <SaveModelWithNameModal showModalSave={setModalSave}/>}
                    {modalLoad && (
                        <ImportModelFromDBModal
                            showModalLoad={setModalLoad}
                            importAction={importStateCanvas}
                            importActionParams={
                                {
                                    canvas: {
                                        numberOfGeneratedKey: 0,
                                        components: [],
                                        lastActionType: "",
                                        selectedComponentKey: 0,
                                    } as CanvasState,
                                } as ImportActionParamsObject
                            }
                        />
                    )}

                    <Sidebar sideBarVisibility={sideBar} setSideBarVisibility={setSideBar}/>

                </div>
                <Statusbar.Statusbar
                    placement="block"
                    right={
                        <Statusbar.Dropdown
                            options={[
                                {
                                    key: "dm",
                                    label: "dm",
                                    onClick: () => setUnit("dm"),
                                },
                                {
                                    key: "cm",
                                    label: "cm",
                                    onClick: () => setUnit("cm"),
                                },
                                {
                                    key: "separator-test",
                                    type: "separator",
                                },
                                {
                                    key: "mm",
                                    label: "mm",
                                    onClick: () => setUnit("mm"),
                                },
                            ]}
                        >
                            units: {unit}
                        </Statusbar.Dropdown>
                    }
                />
            </div>
        </>
    );
}

export default App;
