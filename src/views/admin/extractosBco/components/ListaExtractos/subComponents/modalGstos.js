import moment from 'moment'
import React from 'react'
import {
    Form,
    FormGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter
} from 'reactstrap'

const ModalGstos = ({
    toggle,
    setToggle,
    data,
    desde,
    hasta
}) => {
    return (
        <Modal isOpen={toggle} toggle={() => setToggle(!toggle)}>
            <Form>
                <h2 style={{ textAlign: "center", marginTop: "25px" }}>Gastos e Impuestos de extractos</h2><h3 style={{ textAlign: "center" }}>Desde {moment(desde, "YYYY-MM-DD").format("DD/MM/YYYY")} Hasta {moment(hasta, "YYYY-MM-DD").format("DD/MM/YYYY")}</h3>
                <ModalBody>
                    <FormGroup>
                        <Label style={{ fontWeight: "bold", color: "#775b5b" }} >{`Gastos: $${data.gastos}`}</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontWeight: "bold", color: "#775b5b" }}>{`Impuestos: $${data.impuestos}`} </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{ fontWeight: "bold", color: "#775b5b" }}>{`SIRCREB: $${data.sircreb}`} </Label>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-danger"
                        onClick={e => {
                            e.preventDefault()
                            setToggle(false)
                        }}
                    >
                        Cerrar
                    </button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default ModalGstos