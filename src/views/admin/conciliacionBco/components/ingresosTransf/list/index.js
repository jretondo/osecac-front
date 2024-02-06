import ListadoTable from 'components/subComponents/Listados/ListadoTable';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import TransfRow from './row';

const ListIngresoTransf = ({
    transfArray,
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setCall,
    call,
    setLoading,
    trigger
}) => {
    const [transfRows, setTransfRows] = useState(<></>)

    useEffect(() => {
        setTransfRows(
            transfArray.map((item, key) => {
                return (
                    <TransfRow
                        key={key}
                        id={key}
                        item={item}
                        setActividadStr={setActividadStr}
                        nvaActCall={nvaActCall}
                        setNvaActCall={setNvaActCall}
                        alertar={alertar}
                        setAlertar={setAlertar}
                        setMsgStrong={setMsgStrong}
                        setMsgGralAlert={setMsgGralAlert}
                        setSuccessAlert={setSuccessAlert}
                        setCall={setCall}
                        call={call}
                        setLoading={setLoading}
                        trigger={false}
                    />

                )
            })
        )
    }, [transfArray])

    return (
        <Row style={{ marginTop: "30px" }}>
            <Col md="12">
                <ListadoTable
                    titulos={["Fecha", "F. Déposito", "Oficina", "importe", ""]}
                    listado={transfRows}
                />
            </Col>
        </Row>
    )
}

export default ListIngresoTransf