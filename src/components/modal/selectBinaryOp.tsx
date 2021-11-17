import React, {useEffect, useState} from 'react';
import {Button, FormSelect, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    closeModal,
    modalStateSelector,
    updateLastValue
} from "../../store/modalSlice";
import {binaryOperationExecution, setBinaryOperationExecuting} from "../../store/canvasSlice";

interface SelectBinaryOpProps {
}



export const SelectBinaryOp: React.FC<SelectBinaryOpProps> = ({}) => {
    const NAME = "BINARY_OP";
    const dispatch = useDispatch();



    const modalState = useSelector(modalStateSelector);
    let modal = modalState.modals.filter(modal => modal.name === NAME)[0];
    const [selectedOperation, setSelectedOperation] = useState(modal.lastValue);
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        setShow(modal.currentOpen)
        if(modal.currentOpen){
            dispatch(setBinaryOperationExecuting(true))
        }

    }, [modal.currentOpen]);

    

    const handleClose = () => {
        setShow(false)
        dispatch(closeModal(NAME))

    };

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Operation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSelect
                        onChange={(event) => setSelectedOperation(event.currentTarget.value)}
                        defaultValue={modal.lastValue}
                    >
                        <option value="SUBTRACTION">SUBTRACTION</option>
                        <option value="INTERSECTION">INTERSECTION</option>
                        <option value="UNION">UNION</option>
                    </FormSelect>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        dispatch(updateLastValue({name: NAME, value: selectedOperation}))
                        handleClose()
                    }}>
                        Procedi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}