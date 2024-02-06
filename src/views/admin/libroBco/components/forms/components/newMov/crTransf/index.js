import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'

const Form = ({
    setDescrSm,
    descrSm,
    debe,
    setDebe
}) => {
    const [selectTr, setSelectTr] = useState(false)

    return (<>
        <Row>
            <Col md="12">
                <h3>Créditos por transferencias:</h3>
            </Col>
        </Row>
        {
            selectTr ?
                <Row>
                    <Col md="12" >

                    </Col>
                </Row> :
                <Row>
                    <Col md="12" >
                        <button className="btn btn-primary" >
                            Buscar Transferencia
                        </button>
                    </Col>
                </Row>
        }

    </>)
}

export default Form