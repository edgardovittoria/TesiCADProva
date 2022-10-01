import React from "react";
import "./style/miscToolbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Image, Tooltip } from "react-bootstrap";
import {
  addComponent,
  ComponentEntity,
  getNewKeys,
  numberOfGeneratedKeySelector,
  selectedComponentSelector,
} from "cad-library";
import cloningIcon from "./style/cloningIcon.png";

interface MiscToolbarProps {}

export const MiscToolbar: React.FC<MiscToolbarProps> = () => {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectedComponentSelector);
  const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector);
  return (
    <>
      <div id="misc-toolbar" className="Panel">
        <Tooltip title="CLONE" key="CLONE">
          <button
            className="btn-toolbar"
            onClick={() => {
              let newKey = getNewKeys(numberOfGeneratedKey, dispatch)[0];
              let clonedEntity = {
                ...selectedComponent,
                keyComponent: newKey,
              } as ComponentEntity;
              dispatch(addComponent(clonedEntity));
            }}
          >
            <Image
              src={cloningIcon}
              alt="Cloning operation"
              width={30}
              height={30}
            />
          </button>
        </Tooltip>
      </div>
    </>
  );
};
