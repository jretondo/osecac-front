import React from 'react'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"
import formatMoney from 'Function/NumberFormat'

const FilaTransf = ({
    id,
    item,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    arrayPagos,
    setArrayPagos
}) => {

    const EliminarMov = (e, id) => {
        e.preventDefault()
        const lista = arrayPagos
        lista.splice(id, 1)
        setArrayPagos(lista)
        setMsgStrong("Eliminado éxitosamente!")
        setMsgGralAlert("")
        setSuccessAlert(true)
        setAlertar(!alertar)
    }

    return (
        <>
            <tr key={id}>
                <td style={{ textAlign: "left" }}>
                    {item.raz_soc}
                </td>
                <td style={{ textAlign: "center" }}>
                    {item.cbu}
                </td>
                <td style={{ textAlign: "center" }}>
                    {item.referencia}
                </td>
                <td style={{ textAlign: "center" }}>
                    $ {formatMoney(item.importe)}
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
                                onClick={e => EliminarMov(e, id)}
                            >
                                <i className="fas fa-trash"></i>
                                Eliminar Transferencia
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        </>
    )
}

export default FilaTransf