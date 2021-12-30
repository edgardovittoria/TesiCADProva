import { selectComponent, updateName } from "@Draco112358/cad-library";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

interface OutlinerItemProps{
    keyComponent : number,
    nameComponent : string,
    colorComponent: string,
    isSelelctedComponent: boolean
}

export const OutlinerItem : FC<OutlinerItemProps> = ({keyComponent, nameComponent, isSelelctedComponent, colorComponent}) => {

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
                <span className="type" style={{color: colorComponent }}/>
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