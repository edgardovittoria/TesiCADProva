import React, {useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import "./css/wheelSpinner.css";
import {useDispatch, useSelector} from "react-redux";
import {binaryOperationExecution, canvasStateSelector} from "../../store/canvasSlice";
import {modalStateSelector} from "../../store/modalSlice";

interface WheelSpinnerProps {

}

export const WheelSpinner: React.FC<WheelSpinnerProps> = ({}) => {

    const [show, setShow] = useState(false);

    let visibility = useSelector(binaryOperationExecution);
    useEffect(() => {
        setShow(visibility)
    }, [visibility]);


    if(show){
        console.log(show)
        return <Spinner className="spinner" animation="grow"/>
    }else{
        return <></>
    }
}