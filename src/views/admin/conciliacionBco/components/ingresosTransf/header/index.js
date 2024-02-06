import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import swal from 'sweetalert';
import { useEffect } from 'react';
import ListadoTable from 'components/subComponents/Listados/ListadoTable';
import TransfRow from '../list/row';

const HeaderIngresoTransf = ({
    loading,
    setLoading,
    sendQuery,
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
    setTransfArray
}) => {

    const [fromDate, setFromDate] = useState(moment(new Date().setDate(new Date().getDate() - 1)).format("YYYY-MM-DD"))
    const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [type, setType] = useState("")

    const getTransf = async () => {
        setLoading(true)
        await axios.get(UrlNodeServer.conciliacionDir.sub.transfDep + `?fromDate=${fromDate}&toDate=${toDate}&type=${type}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') },
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                let tranfList = []
                tranfList = response.body

                tranfList.sort((a, b) => a.monto - b.monto)
                tranfList.sort((a, b) => a.tipo - b.tipo)
                tranfList.sort((a, b) => new Date(a.fecha_dep) - new Date(b.fecha_dep))
                setTransfArray(tranfList)
            } else {
                swal("Ingreso de Transferencias", "Hubo un error inesperado", "error")
            }
        }).catch(error => {
            swal("Ingreso de Transferencias", "Hubo un error inesperado", "error")
        }).finally(() => { setLoading(false) })
    }

    useEffect(() => {
        getTransf()
    }, [call])

    return (
        <>
            <Form onSubmit={e => {
                e.preventDefault()
                getTransf()
            }}>
                <Row>
                    {
                        loading ?

                            <Col md="12" style={{ textAlign: "center" }}>
                                <Spinner color="danger" style={{ width: "150px", height: "150px" }} />
                            </Col>
                            :
                            <>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Desde:</Label>
                                        <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} required max={toDate} />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Hasta:</Label>
                                        <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} required min={fromDate} max={moment(new Date()).format("YYYY-MM-DD")} />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="exampleSelect">Filtro:</Label>
                                        <Input type="select" value={type} onChange={e => setType(e.target.value)}>
                                            <option value={""}>Todas</option>
                                            <option value={0}>Actas</option>
                                            <option value={1}>Legales</option>
                                            <option value={2}>Bonos</option>
                                            <option value={3}>Otros</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </>
                    }
                </Row>
                <Row>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <Button disabled={loading} color="primary" style={{ width: "150px" }} type="submit">Buscar</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default HeaderIngresoTransf