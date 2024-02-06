import React from 'react'
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
                <Col md={8}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Desde:{" "}</Label>
                                <Input type="date" name="desde" required value={desde} onChange={e => { setDesde(e.target.value) }} max={hasta} disabled={buscar} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Hasta:{" "}</Label>
                                <Input type="date" name="hasta" required value={hasta} onChange={e => { setHasta(e.target.value) }} min={desde} disabled={buscar} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="concTxt">Concepto, observación o importe:{" "}</Label>
                                <Input type="text" id="concTxt" required value={filtroStr} onChange={e => { setFiltroStr(e.target.value) }} disabled={buscar} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col md={4} style={{ textAlign: "center" }} >
                    {
                        buscar ?
                            <button className="btn btn-danger" style={{ width: "80px", height: "60px", fontSize: "20px", marginTop: "20%" }} onClick={e => {
                                e.preventDefault();
                                CerrarFiltro();
                            }} >X</button> :
                            <button className="btn btn-primary" style={{ width: "150px", height: "60px", fontSize: "20px", marginTop: "20%" }} type="submit" >Buscar</button>
                    }
                </Col>
            </Row>
        </Form>
    )
}

export default Filtro