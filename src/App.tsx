import { useEffect, useState } from "react";
import "./App.css";
import "./GlobalColors.css";
import { SideBar } from "./components/sideBar/sideBar";
import { MyCanvas } from "./components/canvas/MyCanvas";
import { MyNavBar } from "./components/navBar/navBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToolBar } from "./components/toolBar/toolBar";
import { DraggableComponent } from "./components/utility/draggableComponent";
import { KeyboardEventMapper } from "./utils/keyboardEventMapper/keyboardEventMapper";
import "react-statusbar/dist/statusbar.css";
import * as Statusbar from "react-statusbar";
import { SaveModelWithNameModal } from "./components/navBar/components/modals/saveModelWithNameModal";
import {
  CanvasState,
  ImportActionParamsObject,
  ImportModelFromDBModal,
  importStateCanvas,
  SetUserInfo,
} from "cad-library";
import { useAuth0 } from "@auth0/auth0-react";
import { BinaryOpsToolbar } from "./components/binaryOperationsToolbar/binaryOpsToolbar";
import { MiscToolbar } from "./components/miscToolbar/miscToolbar";

export let token = "";

function App() {
  const [sideBar, setSideBar] = useState(false);
  const [sideBarChecked, setSideBarChecked] = useState(false);
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

  const { user, getAccessTokenSilently } = useAuth0();

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
      <div style={{ margin: "0px", height: "100vh" }}>
        <SetUserInfo />
        <MyNavBar
          setViewElementVisibility={showViewElementVisibility}
          sideBarChecked={sideBarChecked}
          setSideBarChecked={setSideBarChecked}
          showModalSave={setModalSave}
          showModalLoading={setModalLoad}
        />
        <KeyboardEventMapper
          setViewElementVisibility={showViewElementVisibility}
          sideBarChecked={sideBarChecked}
          setSideBarChecked={setSideBarChecked}
        />
        <div className="canvas-width-100">
          <MyCanvas />
          <ToolBar />
          <BinaryOpsToolbar />
          <MiscToolbar />
          {modalSave && <SaveModelWithNameModal showModalSave={setModalSave} />}
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
          <DraggableComponent hidden={!sideBar}>
            <div className="sidebar-width-25">
              <SideBar />
            </div>
          </DraggableComponent>
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
