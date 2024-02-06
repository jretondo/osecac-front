import React, { useEffect, useState } from 'react';
import { Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap';
import formatMoney from 'Function/NumberFormat';
import TipoCoseguro from './coseguro';
import ListadoTable from 'components/subComponents/Listados/ListadoTable';
import moment from 'moment';
import Headeer from './header';
import axios from 'axios';
import UrlNodeServer from '../../../../../../api/NodeServer';
import swal from 'sweetalert';
import FilaBolDep from '../../../../../../components/subComponents/Listados/SubComponentes/FilaBolDep';

const titulos = ["Detalle", "Nº Boleta", "Importe", ""]

const FormDataRemitos = () => {
    const [fecha, setFecha] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [detalle, setDetalle] = useState("")
    const [esEfectivo, setEsEfectivo] = useState(0)
    const [importe, setImporte] = useState(0)
    const [nBol, setNBol] = useState(0)
    const [fechaActa, setFechaActa] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [listadoChq, setListadoChq] = useState([])
    const [listadoEfvo, setListadoEfvo] = useState([])
    const [listaChq, setListaChq] = useState(
        <tr style={{ border: "1px solid white" }}><td style={{ color: "white" }}>No hay boletas aún</td></tr>)
    const [listaEfvo, setListaEfvo] = useState(
        <tr style={{ border: "1px solid white" }}><td style={{ color: "white" }}>No hay boletas aún</td></tr>)
    const [tipoDep, setTipoDep] = useState(0)
    const [totalEfvo, setTotalEfvo] = useState(0)
    const [totalChq, setTotalChq] = useState(0)
    const [agSelect, setAgselect] = useState(false)

    const SiguienteBol = async () => {
        const query = `?bol=${nBol}`
        await axios.get(UrlNodeServer.libroBcoDir.sub.siguientesTal + query, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                const siguiente = parseInt(res.data.body.sigBol)
                setNBol(siguiente)
            })
            .catch(() => { })
    }

    const sumatoriaChq = () => {
        let total = 0
        if (listadoChq.length > 0) {
            // eslint-disable-next-line
            listadoChq.map((item, key) => {
                total = total + parseFloat(item.importe)
                if (key === listadoChq.length - 1) {
                    setTotalChq(total)
                }
            })
        } else {
            setTotalChq(0)
        }
    }
    const sumatoriaEfvo = () => {
        let total = 0
        if (listadoEfvo.length > 0) {
            // eslint-disable-next-line
            listadoEfvo.map((item, key) => {
                total = total + parseFloat(item.importe)
                if (key === listadoEfvo.length - 1) {
                    setTotalEfvo(total)
                }
            })
        } else {
            setTotalEfvo(0)
        }
    }

    const verificaBol = async () => {
        const query = `?tipo=1&numero=${nBol}`
        return await axios.get(UrlNodeServer.libroBcoDir.sub.verificaNum + query, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                const num = res.data.body
                if (num > 0) {
                    const hay = listadoChq.find(item => parseInt(item.boleta) === parseInt(nBol))
                    if (hay === undefined) {
                        return num
                    } else {
                        const hay2 = listadoEfvo.find(item => parseInt(item.boleta) === parseInt(nBol))
                        if (hay2 === undefined) {
                            return num
                        } else {
                            return 0
                        }
                    }
                } else {
                    return 0
                }
            })
            .catch(() => {
                return 0
            })
    }

    const EliminarBoleta = (id, tipo) => {
        console.log('id :>> ', id);
        if (tipo === 0) {
            let nvalista = listadoEfvo
            nvalista.splice(id, 1)
            setListadoEfvo(() => [...nvalista])
        } else {
            let nvalista = listadoChq
            nvalista.splice(id, 1)
            setListadoChq(() => [...nvalista])
        }
    }

    const listarBoletas = () => {
        if (listadoChq.length > 0) {
            setListaChq(
                // eslint-disable-next-line
                listadoChq.map((item, key) => {
                    return <FilaBolDep
                        id={key}
                        item={item}
                        key={key}
                        tipo={1}
                        EliminarBoleta={EliminarBoleta}
                    />
                })
            )
        } else {
            setListaChq(<tr style={{ border: "1px solid white" }}><td style={{ color: "white" }}>No hay boletas aún</td></tr>)
        }
        if (listadoEfvo.length > 0) {
            setListaEfvo(
                // eslint-disable-next-line
                listadoEfvo.map((item, key) => {
                    return <FilaBolDep
                        id={key}
                        item={item}
                        key={key}
                        tipo={0}
                        EliminarBoleta={EliminarBoleta}
                    />
                })
            )
        } else {
            setListaEfvo(<tr style={{ border: "1px solid white" }}><td style={{ color: "white" }}>No hay boletas aún</td></tr>)
        }
    }

    const pushArray = async () => {
        const cantidad = await verificaBol()
        if (cantidad > 0) {
            let detalleStr = detalle
            switch (parseInt(tipoDep)) {
                case 0:
                    if (parseInt(esEfectivo) === 1) {
                        detalleStr = detalleStr + " Chq."
                    }
                    break;
                case 2:
                    if (parseInt(esEfectivo) === 0) {
                        detalleStr = detalleStr + " Efvo."
                    }
                    break;
                case 3:
                    if (parseInt(esEfectivo) === 0) {
                        detalleStr = detalleStr + " Efvo."
                    }
                    break;
                case 5:
                    if (parseInt(esEfectivo) === 0) {
                        detalleStr = detalleStr + " Efvo."
                    } else {
                        detalleStr = detalleStr + " Chq."
                    }
                    break;
                default:
                    break;
            }
            if (parseInt(esEfectivo) === 0) {
                setListadoEfvo((listadoEfvo) => [...listadoEfvo, {
                    id: Math.random(new Date()),
                    detalle: detalleStr,
                    boleta: parseInt(nBol),
                    importe: tipoDep === 6 ? 0 : importe
                }])
            } else {
                setListadoChq((listadoChq) => [...listadoChq, {
                    id: Math.random(new Date()),
                    detalle: detalleStr,
                    boleta: parseInt(nBol),
                    importe: tipoDep === 6 ? 0 : importe
                }])
            }
            document.getElementById("tipoDepTxt").focus()
            setAgselect(false)
        } else {
            swal("No permitido", "El número de boleta que quiere colocar no está disponible para cargar. Reviselo!", "error")
        }
    }

    useEffect(() => {
        switch (tipoDep) {
            case 1:
                setDetalle(`ACTAS`)
                break;
            case 2:
                setDetalle(`ACTAS ${moment(fechaActa, "YYYY-MM-DD").format("DD/MM/YYYY")}`)
                break;
            case 3:
                setDetalle(`LEGALES ${moment(fechaActa, "YYYY-MM-DD").format("DD/MM/YYYY")}`)
                break;
            case 4:
                setDetalle("MEDICAMENTOS")
                break;
            case 5:
                setDetalle("")
                break;
            case 6:
                setDetalle("BOLETA ANULADA")
                break;
            default:
                break
        }
        // eslint-disable-next-line
    }, [tipoDep])

    useEffect(() => {
        SiguienteBol()
        sumatoriaChq()
        sumatoriaEfvo()
        listarBoletas()
        // eslint-disable-next-line
    }, [listadoChq.length, listadoEfvo.length])

    return (
        <Form onSubmit={e => {
            e.preventDefault()
            pushArray()
        }} >
            <Headeer
                fecha={fecha}
                setFecha={setFecha}
            />
            <Row>
                <Col md="3">
                    <Label for="tipoDepTxt">Tipo de Deposito</Label>
                    <Input onChange={(e) => setTipoDep(parseInt(e.target.value))} value={tipoDep} type="select" name="select" id="tipoDepTxt">
                        <option value={0}>Coseguro</option>
                        <option value={1}>Actas (Chq. Cartera)</option>
                        <option value={2}>Actas (del día)</option>
                        <option value={3}>Legales</option>
                        <option value={4}>Medicamentos</option>
                        <option value={6}>Boleta Anulada</option>
                        <option value={5}>Otro</option>
                    </Input>
                </Col>

                {
                    tipoDep === 0 ?
                        <Col>
                            <TipoCoseguro
                                detalle={detalle}
                                setDetalle={setDetalle}
                                agSelect={agSelect}
                                setAgselect={setAgselect}
                            />
                        </Col> : null
                }
                {
                    tipoDep === 2 || tipoDep === 3 ?
                        <Col md="4">
                            <FormGroup>
                                <Label for="fechaTxt">Fecha</Label>
                                <Input
                                    type="date"
                                    id="fechaTxt"
                                    value={fechaActa}
                                    onChange={e => setFechaActa(e.target.value)}
                                    required
                                />
                            </FormGroup>
                        </Col> :
                        null
                }
                {
                    tipoDep === 5 ?
                        <Col>
                            <FormGroup>
                                <Label for="detalleTxt">Detalle</Label>
                                <Input
                                    type="text"
                                    id="detalleTxt"
                                    value={detalle}
                                    onChange={e => setDetalle(e.target.value)}
                                    required
                                />
                            </FormGroup>
                        </Col> : null
                }

            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col md="3">
                    <FormGroup>
                        <Label for="boletaTxt">Nº Boleta</Label>
                        <Input type="number" id="boletaTxt" placeholder="Número de boleta..." value={nBol} onChange={e => setNBol(e.target.value)} required />
                    </FormGroup>
                </Col>
                {
                    tipoDep !== 6 ?
                        <Col md="6" >
                            <FormGroup>
                                <Label for="boletaTxt">Importe</Label>
                                <InputGroup>
                                    <Input placeholder="Importe..." value={importe} onChange={e => setImporte(e.target.value)} type="number" style={{ borderRadius: "0.375rem 0 0 0.375rem" }} required />
                                    <InputGroupAddon addonType="append">
                                        <Input style={{ background: "#fb6340", color: "white", borderRadius: "0 0.375rem 0.375rem 0", border: "1px solid #cad1d7" }} onChange={(e) => setEsEfectivo(e.target.value)} value={esEfectivo} type="select" name="select" id="tipoDepTxt">
                                            {
                                                parseInt(tipoDep) === 1 ?
                                                    <option value={1}>Cheques</option> :
                                                    <>
                                                        <option value={0}>Efectivo</option>
                                                        <option value={1}>Cheques</option>
                                                        <option value={2}>Cheques Propio</option>
                                                    </>
                                            }
                                        </Input>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col> :
                        null
                }
                <Col md="3" style={{ textAlign: "center" }} >
                    <button className='btn btn-success' style={{ marginTop: "32px", width: "80%" }}>
                        Cargar
                    </button>
                </Col>
            </Row>
            <Row>
                <Col md="6" style={{ border: "2px solid #626DDE", background: "#626DDE", padding: "5px" }}>
                    <h3 style={{ textAlign: "center", border: "2px solid #626DDE", background: "#626DDE", color: "white" }} >Cheques</h3>
                    <ListadoTable
                        titulos={titulos}
                        listado={listaChq}
                        style={{ border: "2px solid white" }}
                    />
                </Col>
                <Col md="6" style={{ border: "2px solid #626DDE", background: "#626DDE", padding: "5px" }}>
                    <h3 style={{ textAlign: "center", border: "2px solid #626DDE", background: "#626DDE", color: "white" }} >Efectivo</h3>
                    <ListadoTable
                        titulos={titulos}
                        listado={listaEfvo}
                        style={{ border: "2px solid white" }}
                    />
                </Col>
            </Row>
            <Row style={{ border: "2px solid #626DDE", background: "#626DDE" }}>
                <Col md="6" style={{ padding: "5px" }} >
                    <h2 style={{ textAlign: "right", border: "2px solid white", background: "#626DDE", color: "white", paddingRight: "10px" }} >Total Cheques: ${formatMoney(totalChq)}</h2>
                </Col>
                <Col md="6" style={{ padding: "5px" }} >
                    <h2 style={{ textAlign: "right", border: "2px solid white", background: "#626DDE", color: "white", paddingRight: "10px" }} >Total Efectivo: ${formatMoney(totalEfvo)}</h2>
                </Col>
            </Row>
            <Row style={{ border: "2px solid #626DDE", background: "#626DDE" }}>
                <Col md="12" style={{ padding: "5px" }}>
                    <h2 style={{ textAlign: "center", border: "2px solid white", background: "#626DDE", color: "white" }} >Total: ${formatMoney(totalChq + totalEfvo)}</h2>
                </Col>
            </Row>
            <Row style={{ marginTop: "20px", padding: "5px" }}>
                <Col md="6" style={{ textAlign: "center" }}>
                    <button className='btn btn-success' style={{ width: "60%" }}>
                        Confirmar
                    </button>
                </Col>
                <Col md="6" style={{ textAlign: "center", padding: "5px" }}>
                    <button className='btn btn-danger' style={{ width: "60%" }}>
                        Cancelar
                    </button>
                </Col>
            </Row>
        </Form>
    )
}

export default FormDataRemitos
