import React from 'react'
import { useState } from 'react'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'
import Anulacion from './anulacion'
import CrTransf from './crTransf'
import Depositos from './depositos'
import Embargos from './embargos'
import Pagos from './pagos'
import Rechazo from './rechazo'

const NewMov = () => {
    const [tipo, setTipo] = useState(0)

    return (
        <>
            <Row>
                <Col md="12">
                    <FormGroup>
                        <Label for="exampleSelect">Tipo de Movimiento</Label>
                        <Input onChange={(e) => setTipo(e.target.value)} value={tipo} type="select" name="select" id="exampleSelect">
                            <option value={1}>Pagos</option>
                            <option value={2}>Depositos</option>
                            <option value={3}>Créd. Transferencia</option>
                            <option value={4}>Anulación de Comprobantes</option>
                            <option value={5}>Embargos a Cta. Cte.</option>
                            <option value={6}>Rechazo de Déposito</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            {
                parseInt(tipo) === 1 ?
                    <Pagos /> : null
            }
            {
                parseInt(tipo) === 2 ?
                    <Depositos /> : null
            }
            {
                parseInt(tipo) === 3 ?
                    <CrTransf /> : null
            }
            {
                parseInt(tipo) === 4 ?
                    <Anulacion /> : null
            }
            {
                parseInt(tipo) === 5 ?
                    <Embargos /> : null
            }
            {
                parseInt(tipo) === 6 ?
                    <Rechazo /> : null
            }
        </>
    )
}

export default NewMov
