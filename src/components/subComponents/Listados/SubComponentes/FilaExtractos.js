import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Input,
    ModalFooter,
    Button
} from "reactstrap"
import formatDate from '../../../../Function/FormatDate'
import NumberFormat from '../../../../Function/NumberFormat'
import swal from 'sweetalert'
import axios from 'axios'
import UrlNodeServer from '../../../../api/NodeServer'
import FileSaver from 'file-saver'
import moment from 'moment'
const FilaProducto = ({
    id,
    item,
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
    setEsperar,
    primero,
    pagina,
    setPagina,
    setFechaDet,
    setDetBool
}) => {
    const [modal, setModal] = useState(false)
    const [tipo, setTipo] = useState(0)
    const [importe, setimporte] = useState(0)

    const DescargarExtr = async (e, fecha) => {
        e.preventDefault()
        const datos = `?desde=${fecha}&hasta=${fecha}`
        setEsperar(true)
        await axios.get(UrlNodeServer.extractosDir.sub.download + datos, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: 'application/pdf',
            }
        })
            .then(res => {
                FileSaver.saveAs(
                    new Blob([res.data], { type: 'application/pdf' })
                );
                setEsperar(false)
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
                setEsperar(false)
            })
    }
    const EliminarExtracto = (e, fecha) => {
        e.preventDefault()
        swal({
            title: "Eliminar Extracto!",
            text: "¿Está seguro de eliminar el extracto del " + moment(fecha, "YYYY-MM-DD").format("DD/MM/YYYY") + "? Esta operación no se puede revertir.",
            icon: "warning",
            buttons: {
                cancel: "No",
                Si: true
            },
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    setEsperar(true)
                    await axios.delete(`${UrlNodeServer.extractosDir.extractos}/${fecha}`, {
                        headers:
                            { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
                    })
                        .then(() => {
                            if (primero) {
                                if (pagina > 1) {
                                    setPagina(parseInt(pagina - 1))
                                }
                            }
                            setActividadStr("El usuario ha eliminado el extracto del día " + formatDate(new Date(fecha), "dd/mm/yyyy"))
                            setNvaActCall(!nvaActCall)
                            setMsgStrong("Extracto eliminado con éxito!")
                            setMsgGralAlert("")
                            setSuccessAlert(true)
                            setAlertar(!alertar)
                            setCall(!call)
                            setEsperar(false)
                        })
                        .catch(() => {
                            setMsgStrong("Hubo un error al querer eliminar el Extracto")
                            setMsgGralAlert("")
                            setSuccessAlert(false)
                            setAlertar(!alertar)
                            setEsperar(false)
                        })
                }
            });
    }

    const ListarMov = async (fecha) => {
        setFechaDet(moment(fecha, "YYYY-MM-DD").format("YYYY-MM-DD"))
        setDetBool(true)
    }

    const nuevoimpGasto = async () => {
        setEsperar(true)
        const data = {
            tipo: tipo,
            importe: importe,
            fecha: item.fecha1
        }
        await axios.post(`${UrlNodeServer.extractosDir.sub.gastosImpuesto}`, data, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(() => {
                setMsgStrong("Impuesto/Gasto agregado con éxito!")
                setMsgGralAlert("")
                setSuccessAlert(true)
                setAlertar(!alertar)
                setCall(!call)
                setEsperar(false)
            })
            .catch(() => {
                setMsgStrong("Hubo un error al querer agregar el gasto/impuesto")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setEsperar(false)
            })
    }


    return (
        <>
            <tr key={id}>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    {formatDate(new Date(item.fecha1), "dd/mm/yyyy")}
                </td>
                <td style={{ textAlign: "center" }}>
                    ${" "}{NumberFormat(item.saldoIni)}
                </td>
                <td style={parseInt(item.movDia) > 0 ? { textAlign: "center", color: "green", fontWeight: "bold" } : { textAlign: "center", color: "red", fontWeight: "bold" }}>
                    ${" "}{NumberFormat(item.movDia)}
                </td>
                <td style={{ textAlign: "center" }}>
                    ${" "}{NumberFormat(item.saldoFinal)}
                </td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                        >
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => DescargarExtr(e, moment(new Date(item.fecha1), "YYYY-MM-DD").format("YYYY-MM-DD"))}
                            >
                                <i className="fas fa-download"></i>
                                Descargar PDF
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    ListarMov(item.fecha1)
                                }}
                            >
                                <i className="fas fa-search"></i>
                                Ver Movimientos
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    setModal(true)
                                }}
                            >
                                <i className="fas fa-upload"></i>
                                Agregar Impuestos o Gastos
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => EliminarExtracto(e, moment(new Date(item.fecha1), "YYYY-MM-DD").format("YYYY-MM-DD"))}
                            >
                                <i className="fas fa-trash"></i>
                                Eliminar Extracto
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr >
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader>Agregar impuestos o Gastos el dia <span style={{ marginLeft: "5px", fontSize: "20px", color: "#626dde", fontWeight: "bold" }}>{formatDate(new Date(item.fecha1), "dd/mm/yyyy")}</span></ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Tipo de movimiento:</Label>
                        <Input type="select" value={tipo} onChange={e => setTipo(e.target.value)}>
                            <option value={0}>Gasto</option>
                            <option value={1}>Impuesto</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Importe:</Label>
                        <Input type="number" value={importe} onChange={e => setimporte(e.target.value)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        onClick={e => {
                            e.preventDefault()
                            setModal(false)
                        }}
                    >Cerrar</Button>
                    <Button
                        color="primary"
                        onClick={e => {
                            e.preventDefault()
                            nuevoimpGasto()
                        }}
                    >
                        Aplicar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default FilaProducto