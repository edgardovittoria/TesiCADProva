import { useAuth0 } from '@auth0/auth0-react'
import { canvasStateSelector, FaunaCadModel, saveNewModel } from 'cad-library'
import { FC, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export const SaveModelWithNameModal: FC<{ showModalSave: Function }> = ({ showModalSave }) => {
    const [name, setName] = useState("")
    const { user } = useAuth0()
    const canvas = useSelector(canvasStateSelector)

    const saveModel = async () => {
        let newModel = {
            name: name,
            components: canvas.components,
            owner_id: user?.sub,
            owner: user?.name
        } as FaunaCadModel
        await saveNewModel(newModel)
    }

    return (
        <Modal show={true}>
            <Modal.Header><Modal.Title>Save model to database</Modal.Title></Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className='col-3'>
                        <label>Name:</label>
                    </Col>
                    <Col className='col-9'>
                        <input
                            type="text"
                            value={name}
                            required
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => { showModalSave(false) }}
                        >
                            Cancel
                        </button>
                    </Col>
                    <Col>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={(name === "") ?
                                () => { toast.error("You must insert a valid name for the model.") }
                                :
                                () => {
                                    showModalSave(false)
                                    saveModel()
                                }
                            }
                        >
                            Save
                        </button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}