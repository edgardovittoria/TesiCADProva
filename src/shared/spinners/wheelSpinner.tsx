import React, {useEffect, useState} from 'react';
import {Spinner} from "react-bootstrap";
import "./css/wheelSpinner.css";
import {useSelector} from "react-redux";
import {canvasStateSelector} from "../../store/canvasSlice";

interface WheelSpinnerProps {
}

export const WheelSpinner: React.FC<WheelSpinnerProps> = ({}) => {
    return (
        <Spinner className="spinner" animation="grow" style={{color: "white"}}/>
    )

}