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
    setFiltro,
    filtro
}) => {

    const ConsultaFechas = (e) => {
        e.preventDefault()
        if (filtro) {
            setDetalleStr("")
        }
        setFiltro(!filtro)
    }

    return (
        <Form onSubmit={e => ConsultaFechas(e)}>
            <Row form style={{ textAlign: "left" }}>
                {
                    !filtro ?
                        <>
                            <Col md={8}>
                                <FormGroup>
                                    <Label for="exampleEmail">Filtrar Agencia:{" "}</Label>
                                    <Input type="text" required value={detalleStr} onChange={e => { setDetalleStr(e.target.value) }} />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <Row>
                                    <Col >
                                        <button className="btn btn-primary" style={{ marginTop: "33px" }} type="submit">Buscar</button>
                                    </Col>
                                </Row>
                            </Col>
                        </> :
                        <>
                            <Col md={8}>
                                <FormGroup>
                                    <Label for="exampleEmail">Resultados de:{" "}</Label>
                                    <Input type="text" required value={detalleStr} disabled />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <Row>
                                    <Col >
                                        <button className="btn btn-danger" style={{ marginTop: "33px" }} type="submit">X</button>
                                    </Col>
                                </Row>
                            </Col>
                        </>
                }

            </Row>
        </Form>
    )
}

export default Filtro