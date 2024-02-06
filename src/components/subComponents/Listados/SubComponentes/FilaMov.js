import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"
import swal from 'sweetalert'
import axios from 'axios'
import UrlNodeServer from '../../../../api/NodeServer'
import formatMoney from 'Function/NumberFormat'
import ModalDiference from '../ModalDiference'

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
    setPagina
}) => {

    const [modal, setModal] = useState(false)

    const EliminarMov = (e, id, detalle) => {
        e.preventDefault()
        swal({
            title: "Eliminar Movimiento!",
            text: "¿Está seguro de eliminar el movimiento: " + detalle + " ? Esta operación no se puede revertir.",
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
                    await axios.delete(UrlNodeServer.extractosDir.sub.removeId + id, {
                        headers:
                            { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
                    })
                        .then(() => {
                            if (primero) {
                                if (pagina > 1) {
                                    setPagina(parseInt(pagina - 1))
                                }
                            }
                            setActividadStr("El usuario ha eliminado el movimiento " + detalle)
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

    const DiferenciaMov = async (id) => {
        setModal(true)
    }

    return (
        <>
            <tr key={id}>
                <td style={{ textAlign: "center" }}>
                    {item.nro_cbte}
                </td>
                <td style={{ textAlign: "left" }}>
                    {item.concepto + " " + item.descripcion}
                </td>
                <td style={parseInt(item.monto) > 0 ? { textAlign: "right", color: "green", fontWeight: "bold" } : { textAlign: "right", color: "red", fontWeight: "bold" }}>
                    $ {formatMoney(item.monto)}
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
                            {
                                item.id_tipo > 5 ?
                                    null
                                    :
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={e => {
                                            e.preventDefault()
                                            DiferenciaMov(item.id)
                                        }}
                                    >
                                        <i className="fas fa-search"></i>
                                        Diferencia
                                    </DropdownItem>
                            }
                            <DropdownItem
                                href="#pablo"
                                onClick={e => EliminarMov(e, item.id, `${item.concepto} ${item.descripcion}`)}
                            >
                                <i className="fas fa-trash"></i>
                                Eliminar Movimiento
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr >
            <ModalDiference
                impOriginal={item.monto}
                modal={modal}
                setModal={setModal}
                idMov={item.id}
                alertar={alertar}
                setAlertar={setAlertar}
                setMsgStrong={setMsgStrong}
                setMsgGralAlert={setMsgGralAlert}
                setSuccessAlert={setSuccessAlert}
                setActividadStr={setActividadStr}
                nvaActCall={nvaActCall}
                setNvaActCall={setNvaActCall}
                setCall={setCall}
                call={call}
            />
        </>
    )
}

export default FilaProducto