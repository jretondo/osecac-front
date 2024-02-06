
import UrlNodeServer from '../../../../../../api/NodeServer'
import axios from 'axios'
import ListadoTable from 'components/subComponents/Listados/ListadoTable'
import FilaTransf from 'components/subComponents/Listados/SubComponentes/FilaTransf'
import React, { useEffect, useState } from 'react'
import { Col, Container, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import FileSaver from 'file-saver'
import formatMoney from 'Function/NumberFormat'

const titulos = ["Agencia", "CBU", "Refencia", "Monto", ""]

const ListaTransf = ({
    arrayPagos,
    setArrayPagos,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert
}) => {
    const [listado, setListado] = useState(<></>)
    const [loading, setLoading] = useState(false)
    const [totalStr, setTotalStr] = useState("$ 0,00")

    useEffect(() => {
        ListarPagos()
        CalculoTotal()
        // eslint-disable-next-line
    }, [arrayPagos.length])

    const GenerarTxt = async () => {
        setLoading(true)
        await axios.post(UrlNodeServer.proveedoresDir.sub.newTxt, arrayPagos, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: 'text/plain',
            }
        })
            .then(res => {
                setLoading(false)
                var blob = new Blob([res.data], { type: "text/plain" })
                FileSaver.saveAs(blob, "Transferencias masivas.txt")
                setMsgStrong("Procesado con éxito!")
                setMsgGralAlert(" ")
                setSuccessAlert(true)
                setAlertar(!alertar)
            })
            .catch(() => {
                setLoading(false)
                setMsgStrong("Hubo un error!")
                setMsgGralAlert(" Intente nuevamente.")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    const ListarPagos = () => {
        try {
            setListado(
                // eslint-disable-next-line
                arrayPagos.map((item, key) => {
                    return (
                        <FilaTransf
                            key={key}
                            id={key}
                            item={item}
                            alertar={alertar}
                            setAlertar={setAlertar}
                            setMsgStrong={setMsgStrong}
                            setMsgGralAlert={setMsgGralAlert}
                            setSuccessAlert={setSuccessAlert}
                            arrayPagos={arrayPagos}
                            setArrayPagos={setArrayPagos}
                        />
                    )
                })
            )
        } catch (error) {
            setListado(<></>)
        }
    }

    const CalculoTotal = () => {
        const cantTotal = parseInt(arrayPagos.length)
        let totalDouble = 0
        if (cantTotal > 0) {
            // eslint-disable-next-line
            arrayPagos.map((item, key) => {
                const importe = (Math.round((parseFloat(item.importe) * 100)) / 100)
                totalDouble = totalDouble + importe
                if (key === (cantTotal - 1)) {
                    console.log(`totalDouble`, totalDouble)
                    setTotalStr("$ " + formatMoney(totalDouble, 2))
                }
            })
        }
    }

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
            </div>
        )
    } else {
        return (
            <Container style={{ marginTop: "25px" }}>
                <Row>
                    <Col md="12">
                        <h2 style={{ textAlign: "center" }}>Listado de transferencias</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" >
                        <ListadoTable
                            listado={listado}
                            titulos={titulos}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <button
                            className="btn btn-primary"
                            style={{ margin: "25px", width: "200px" }}
                            disabled={
                                arrayPagos.length > 0 ?
                                    false : true
                            }
                            onClick={e => {
                                e.preventDefault();
                                GenerarTxt();
                            }}
                        >
                            Generar Txt
                        </button>
                        <button
                            className="btn btn-danger"
                            style={{ margin: "25px", width: "200px" }}
                            onClick={e => {
                                e.preventDefault();
                                setArrayPagos([]);
                                setListado(<></>);
                            }}
                        >
                            Cancelar
                        </button>
                    </Col>
                </Row>
                <Row style={{ borderTop: "2px solid red" }} >
                    <Col md="4" style={{ marginLeft: "auto", marginTop: "20px" }}>
                        <FormGroup>
                            <Label style={{ fontSize: "22px", fontWeight: "bold" }}>Total</Label>
                            <Input type="text" name="text" style={{ fontSize: "22px", fontWeight: "bold", textAlign: "right" }} value={totalStr} disabled />
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ListaTransf