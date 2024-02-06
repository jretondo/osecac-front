import React, { useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'

const ModalCbuPresta = ({
    modalCbu,
    toggleModalCbu,
    item
}) => {
    const [tipoCbu, setTipoCbu] = useState(item.tipo_cta === "" ? "01" : item.tipo_cta)
    const [cbuNro, setCbuNro] = useState(item.cbu === "" ? "" : item.cbu)

    return (
        <Modal isOpen={modalCbu} toggle={toggleModalCbu}>
            <ModalHeader style={{ fontSize: "20px" }} toggle={toggleModalCbu}>Datos Bancarios de <span style={{ color: "red" }} >{item.raz_soc}</span></ModalHeader>
            <ModalBody>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="tipoCbuTxt" >Tipo Cuenta</Label>
                            <Input type="select" id="tipoCbuTxt" value={tipoCbu} onChange={e => setTipoCbu(e.target.value)}>
                                <option value={"01"}>Caja de Ahorros</option>
                                <option value={"03"}>Cuenta Corriente</option>
                                <option value={"06"}>Especial Persona Juridica</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="nroCbuTxt">Nº CBU</Label>
                            <Input type="number" id="nroCbuTxt" placeholder="Número de CBU..." value={cbuNro} onChange={e => setCbuNro(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleModalCbu}>Actualizar</Button>
                <Button color="danger" onClick={toggleModalCbu}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalCbuPresta