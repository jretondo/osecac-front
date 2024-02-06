import React from 'react'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"
import swal from 'sweetalert'
import axios from 'axios'
import UrlNodeServer from '../../../../api/NodeServer'

const FilaAgencias = ({
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
    setDetallesBool,
    setIdDetalle,
    setNvoForm
}) => {

    const EliminarAgencia = (e, nombre, id) => {
        e.preventDefault()
        swal({
            title: "Eliminar Agencia!",
            text: "¿Está seguro de eliminar la agencia " + nombre + " ? Esta operación no se puede revertir",
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
                    await axios.delete(`${UrlNodeServer.proveedoresDir.proveedores}/${id}`, {
                        headers:
                            { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
                    })
                        .then(() => {
                            if (primero) {
                                if (pagina > 1) {
                                    setPagina(parseInt(pagina - 1))
                                }
                            }
                            setActividadStr("El usuario ha eliminado a la agencia " + nombre)
                            setNvaActCall(!nvaActCall)
                            setMsgStrong("Agencia eliminada con éxito!")
                            setMsgGralAlert("")
                            setSuccessAlert(true)
                            setAlertar(!alertar)
                            setCall(!call)
                            setEsperar(false)
                        })
                        .catch(() => {
                            setMsgStrong("Hubo un error al querer eliminar la agencia")
                            setMsgGralAlert("")
                            setSuccessAlert(false)
                            setAlertar(!alertar)
                            setEsperar(false)
                        })
                }
            });
    }

    const VerDetalles = (id) => {
        setNvoForm(true)
        setIdDetalle(id)
        setDetallesBool(true)
    }

    return (
        <tr key={id}>
            <td style={{ textAlign: "center", fontWeight: "bold" }}>
                {item.raz_soc}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.localidad}
            </td>
            <td style={{ textAlign: "center" }}>
                <a href={`mailto:${item.email}`}>{item.email}</a>
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
                            onClick={e => {
                                e.preventDefault();
                                VerDetalles(item.id);
                            }}
                        >
                            <i className="fas fa-search"></i>
                            Ver Detalle
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => EliminarAgencia(e, item.raz_soc, item.id)}
                        >
                            <i className="fas fa-trash"></i>
                            Eliminar Agencia
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr >
    )
}

export default FilaAgencias