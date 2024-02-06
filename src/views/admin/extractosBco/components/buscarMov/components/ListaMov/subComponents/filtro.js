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
    detalleStr,
    setDetalleStr,
    setFiltro
}) => {

    const ConsultaFechas = (e) => {
        e.preventDefault()
        setFiltro(true)
    }

    return (
        <Form onSubmit={e => ConsultaFechas(e)}>
            <Row form style={{ textAlign: "left" }}>
                <Col md={8}>
                    <FormGroup>
                        <Label for="exampleEmail">Filtro:{" "}</Label>
                        <Input type="text" required value={detalleStr} onChange={e => { setDetalleStr(e.target.value) }} />
                    </FormGroup>
                </Col>
                <Col md="4">
                    <Row>
                        <Col >
                            <button className="btn btn-primary" style={{ marginTop: "33px" }} type="submit">Filtrar</button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    )
}

export default Filtro