import UrlNodeServer from '../../../../../../api/NodeServer'
import axios from 'axios'
import ListadoTable from 'components/subComponents/Listados/ListadoTable'
import React, { useEffect, useState } from 'react'
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Spinner
} from 'reactstrap'
import FilaMovSin from './FilaMovSin'
import moment from 'moment'
import FileSaver from 'file-saver'

const titulos = ["Fecha", "Descripción", "Monto", "Obs", ""]

const ListSinMov = ({
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
    setDetBool
}) => {
    const [listado, setListado] = useState(<></>)
    const [loading, setLoading] = useState(false)
    const [desde, setDesde] = useState(moment(new Date()).subtract(6, "month").format("YYYY-MM-DD"))
    const [hasta, setHasta] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [pend, setPend] = useState(true)
    const [busqueda, setBusqueda] = useState("")
    const [importe, setImporte] = useState("")

    useEffect(() => {
        listar()
        // eslint-disable-next-line      
    }, [])

    useEffect(() => {
        setListado(<></>)
        listar()
        // eslint-disable-next-line     
    }, [call])

    const listar = async () => {
        setLoading(true)
        let datos
        if (pend) {
            datos = {
                desde: desde,
                hasta: hasta,
                pend: pend,
                busqueda: busqueda,
                importe: importe
            }
        } else {
            datos = {
                desde: desde,
                hasta: hasta,
                busqueda: busqueda,
                importe: importe
            }
        }

        await axios.get(`${UrlNodeServer.conciliacionDir.sub.transferencias}`, {
            params: datos,
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                setLoading(false)
                const data = res.data.body
                if (parseInt(data.length) > 0) {
                    setListado(
                        data.map((item, key) => {
                            return (
                                <FilaMovSin
                                    id={key}
                                    key={key}
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
                                    setEsperar={setLoading}
                                    setDetBool={setDetBool}
                                />
                            )
                        })
                    )
                } else {
                    setListado(
                        <tr style={{ textAlign: "center", width: "100%" }}>
                            <td>
                                No hay transferencias con los filtros actuales
                            </td>
                        </tr>
                    )
                }
            })
            .catch((erro) => {
                console.error(erro);
                setLoading(false)
                setListado(
                    <tr style={{ textAlign: "center", width: "100%" }}>
                        <td>
                            No hay transferencias con los filtros actuales
                        </td>
                    </tr>
                )
            })
    }

    const DescargarExtr = async () => {
        let data
        if (pend) {
            data = {
                desde: desde,
                hasta: hasta,
                pend: pend,
                busqueda: busqueda,
                importe: importe
            }
        } else {
            data = {
                desde: desde,
                hasta: hasta,
                busqueda: busqueda,
                importe: importe
            }
        }
        setLoading(true)
        await axios.get(UrlNodeServer.conciliacionDir.sub.download, {
            responseType: 'arraybuffer',
            params: data,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: 'application/pdf',
            }
        })
            .then(res => {
                FileSaver.saveAs(
                    new Blob([res.data], { type: 'application/pdf' })
                );
                setLoading(false)
                setMsgStrong("Extracto descargado con éxito! ")
                setMsgGralAlert("")
                setSuccessAlert(true)
                setAlertar(!alertar)
            })
            .catch((err) => {
                console.error(err)
                setMsgStrong("Hubo un error al querer descargar el Extracto")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setLoading(false)
            })
    }

    const DescargarExtrExcel = async () => {
        let data
        if (pend) {
            data = {
                desde: desde,
                hasta: hasta,
                pend: pend,
                busqueda: busqueda,
                importe: importe
            }
        } else {
            data = {
                desde: desde,
                hasta: hasta,
                busqueda: busqueda,
                importe: importe
            }
        }
        setLoading(true)
        await axios.get(UrlNodeServer.conciliacionDir.sub.excel, {
            responseType: 'arraybuffer',
            params: data,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: 'application/vnd.ms-excel',
            }
        })
            .then(res => {
                var blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
                FileSaver.saveAs(blob, "Transferencias.xls");
                setLoading(false)
                setMsgStrong("Extracto descargado con éxito! ")
                setMsgGralAlert("")
                setSuccessAlert(true)
                setAlertar(!alertar)
            })
            .catch((err) => {
                console.error(err)
                setMsgStrong("Hubo un error al querer descargar el Extracto")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setLoading(false)
            })
    }

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
            </div>
        )
    } else {
        return (
            <>
                <Form onSubmit={e => {
                    e.preventDefault();
                    listar();
                }}
                >
                    <Row>
                        <Col md="8">
                            <Row form style={{ textAlign: "left" }}>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="desdeTxt">Desde:{" "}</Label>
                                        <Input type="date" id="desdeTxt" required value={desde} onChange={e => { setDesde(e.target.value) }} max={hasta} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="hastaTxt">Hasta:{" "}</Label>
                                        <Input type="date" id="hastaTxt" required value={hasta} onChange={e => { setHasta(e.target.value) }} min={desde} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="importeTxt">Importe:{" "}</Label>
                                        <Input type="number" id="importeTxt" value={importe} onChange={e => { setImporte(e.target.value) }} step={0.01} min={0.01} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup check style={{ marginTop: "30px  " }}>
                                        <Label for="pendTxt" check>
                                            <Input type="checkbox" id="pendTxt" checked={pend} onChange={e => setPend(e.target.checked)} />{' '}
                                            Pendientes
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="busquedatxt">Busqueda</Label>
                                        <Input
                                            value={busqueda}
                                            onChange={e => setBusqueda(e.target.value)}
                                            type="text"
                                            id="busquedatxt"
                                            placeholder="Palabra clave (descripcion o tipo)..." />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                            <Row>
                                <Col col="12">
                                    <button className="btn btn-primary" type="submit" style={{ marginTop: "5%", width: "100%" }}>
                                        <Row>
                                            <Col style={{ textAlign: "center" }}>
                                                Buscar <i className="fas fa-search" style={{ marginLeft: "10px" }}></i>
                                            </Col>
                                        </Row>
                                    </button>
                                </Col>
                            </Row>
                            <Row>
                                <Col col="12">
                                    <button className="btn btn-primary" type="submit" style={{ marginTop: "5%", width: "100%" }} onClick={e => {
                                        e.preventDefault();
                                        DescargarExtr();
                                    }}>
                                        <Row>
                                            <Col style={{ textAlign: "center" }}>
                                                Reporte en PDF <i className="fas fa-download" style={{ marginLeft: "10px" }}></i>
                                            </Col>
                                        </Row>
                                    </button>
                                </Col>
                            </Row>
                            <Row>
                                <Col col="12">
                                    <button className="btn btn-primary" type="submit" style={{ marginTop: "5%", width: "100%" }} onClick={e => {
                                        e.preventDefault();
                                        DescargarExtrExcel();
                                    }}>
                                        <Row>
                                            <Col style={{ textAlign: "center" }}>
                                                Reporte en Excel <i className="fas fa-file-excel" style={{ marginLeft: "10px" }}></i>
                                            </Col>
                                        </Row>
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
                <ListadoTable
                    listado={listado}
                    titulos={titulos}
                />
            </>
        )
    }
}

export default ListSinMov