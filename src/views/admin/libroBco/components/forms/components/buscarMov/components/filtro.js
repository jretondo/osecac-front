import React, { useState } from 'react'
import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Label
} from "reactstrap"

const Filtro = ({
    desde,
    hasta,
    setDesde,
    setHasta,
    setFiltroStr,
    filtroStr,
    setBuscar,
    buscar
}) => {
    const [tipo, setTipo] = useState(0)

    const ConsultaFechas = (e) => {
        e.preventDefault()
        setBuscar(true)
    }

    const CerrarFiltro = () => {
        setFiltroStr("")
        setBuscar(false)
    }

    return (
        <Form onSubmit={e => ConsultaFechas(e)}>
            <Row form style={{ textAlign: "left" }}>
                <Col md={12}>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="concTxt">Detalle o Importe:{" "}</Label>
                                <Input type="text" id="concTxt" required value={filtroStr} onChange={e => { setFiltroStr(e.target.value) }} disabled={buscar} placeholder="Concepto, OP, Nº Cbte, etc..." />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="concTxt">Tipo de Movimiento:{" "}</Label>
                                <Input onChange={(e) => setTipo(e.target.value)} value={tipo} type="select" name="select" id="exampleSelect">
                                    <option value={0} >Todos</option>
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
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail">Desde:{" "}</Label>
                                <Input type="date" name="desde" required value={desde} onChange={e => { setDesde(e.target.value) }} max={hasta} disabled={buscar} />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleEmail">Hasta:{" "}</Label>
                                <Input type="date" name="hasta" required value={hasta} onChange={e => { setHasta(e.target.value) }} min={desde} disabled={buscar} />
                            </FormGroup>
                        </Col>
                        <Col md={4} style={{ textAlign: "center" }} >
                            {
                                buscar ?
                                    <button className="btn btn-danger" style={{ width: "200px", height: "50px", fontSize: "20px", marginTop: "10%" }} onClick={e => {
                                        e.preventDefault();
                                        CerrarFiltro();
                                    }} >X</button> :
                                    <button className="btn btn-primary" style={{ width: "80%", height: "50px", fontSize: "20px", marginTop: "10%" }} type="submit" >Buscar</button>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    )
}

export default Filtro