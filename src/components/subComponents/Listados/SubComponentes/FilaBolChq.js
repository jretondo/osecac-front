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
}) => {

    const EliminarTalonario = (e, id) => {
        e.preventDefault()
        swal({
            title: "Eliminar Talonario!",
            text: `¿Está seguro de eliminar el talonario ${item.desde} - ${item.hasta}? Esta operación no se puede revertir.`,
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
                    await axios.delete(`${UrlNodeServer.libroBcoDir.sub.talonarios}/${id}`, {
                        headers:
                            { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
                    })
                        .then(() => {
                            if (primero) {
                                if (pagina > 1) {
                                    setPagina(parseInt(pagina - 1))
                                }
                            }
                            setActividadStr(`Se ha eliminado el talonario ${item.desde} - ${item.hasta}`)
                            setNvaActCall(!nvaActCall)
                            setMsgStrong("Talonario eliminado con éxito!")
                            setMsgGralAlert("")
                            setSuccessAlert(true)
                            setAlertar(!alertar)
                            setCall(!call)
                            setEsperar(false)
                        })
                        .catch(() => {
                            setMsgStrong("Hubo un error al querer eliminar el talonario")
                            setMsgGralAlert("")
                            setSuccessAlert(false)
                            setAlertar(!alertar)
                            setEsperar(false)
                        })
                }
            });
    }

    return (
        <tr key={id}>
            <td style={{ textAlign: "center", fontWeight: "bold" }}>
                {item.desde}
            </td>
            <td style={{ textAlign: "center", fontWeight: "bold" }}>
                {item.hasta}
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
                            onClick={e => EliminarTalonario(e, item.id)}
                        >
                            <i className="fas fa-trash"></i>
                            Eliminar Rango
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr >
    )
}

export default FilaProducto