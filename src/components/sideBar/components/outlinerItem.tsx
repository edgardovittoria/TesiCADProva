import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { selectComponent, updateName } from "../../../store/canvasSlice";

interface OutlinerItemProps{
    keyComponent : number,
    nameComponent : string,
    isSelelctedComponent: boolean
}

export const OutlinerItem : FC<OutlinerItemProps> = ({keyComponent, nameComponent, isSelelctedComponent}) => {

    const [outlinerItemVisibility, setOutlinerItemVisibility] = useState(true);
    const [inputItemVisibility, setInputItemVisibility] = useState(false);
    const dispatch = useDispatch()

    return (
        <>
            <div
                key={keyComponent}
                className={(isSelelctedComponent) ? "option active" : "option"}
                onClick={() => {
                    dispatch(selectComponent(keyComponent))
                }}
                onDoubleClick={() => {
                    setOutlinerItemVisibility(false)
                    setInputItemVisibility(true)
                }}
                hidden={!outlinerItemVisibility}
            >
                <span className="opener"/>
                <span className="type Mesh"/>
                {nameComponent}
            </div>
            <div key={keyComponent + "_input"} hidden={!inputItemVisibility}>
                <input
                    type="text"
                    defaultValue={nameComponent + keyComponent}
                    onBlur={(e) => {
                        dispatch(updateName({key: keyComponent, name: e.currentTarget.value}))
                        setInputItemVisibility(false)
                        setOutlinerItemVisibility(true)
                    }}
                />
            </div>
        </>

    )
}