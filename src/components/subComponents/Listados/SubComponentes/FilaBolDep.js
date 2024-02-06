import formatMoney from 'Function/NumberFormat'
import React from 'react'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"

const FilaBoletaDep = ({
    id,
    item,
    tipo,
    EliminarBoleta
}) => {

    return (
        <tr key={id} style={{ color: "white" }}>
            <td style={{ textAlign: "center", fontSize: "10px", paddingInline: "5px" }}>
                {item.detalle}
            </td>
            <td style={{ textAlign: "center", fontSize: "10px", paddingInline: "5px" }}>
                {item.boleta}
            </td>
            <td style={{ textAlign: "center", fontSize: "12px", paddingInline: "5px" }}>
                $ {formatMoney(item.importe)}
            </td>
            <td className="text-right" style={{ paddingInline: 0 }}>
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
                                e.preventDefault()
                                EliminarBoleta(id, tipo)
                            }}
                        >
                            <i className="fas fa-trash"></i>
                            Eliminar boleta
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr >
    )
}

export default FilaBoletaDep