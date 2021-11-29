import React, {useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import "./css/wheelSpinner.css";
import {useDispatch, useSelector} from "react-redux";
import {binaryOperationExecution, canvasStateSelector} from "../../store/canvasSlice";
import {modalStateSelector} from "../../store/modalSlice";

interface WheelSpinnerProps {
    spinnerVisibility: boolean
}

export const WheelSpinner: React.FC<WheelSpinnerProps> = ({spinnerVisibility}) => {

    


    if(spinnerVisibility){
        return <Spinner className="h-5 w-5 mr-3 animate-spin" animation="border"/>
    }else{
        return <></>
    }
}