import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"
import formatMoney from 'Function/NumberFormat'
import ModalTypeList from './modalTypeList'
import moment from 'moment'

const FilaMovSin = ({
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
    call
}) => {

    const [modal, setModal] = useState(false)

    const AsignarTipo = async () => {
        setModal(true)
    }

    return (
        <>
            <tr key={id}>
                <td style={{ textAlign: "center" }}>
                    {moment(item.fecha).format("DD/MM/YYYY")}
                </td>
                <td style={{ textAlign: "left" }}>
                    {item.concepto + " " + item.descripcion}
                </td>
                <td style={{ textAlign: "center" }}>
                    {item.nro_cbte}
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
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    AsignarTipo(item.id)
                                }}
                            >
                                <i className="fas fa-search"></i>
                                Asignar Tipo de Movimiento
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr >
            <ModalTypeList
                modal={modal}
                setModal={setModal}
                idMov={item.id}
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
            />
        </>
    )
}

export default FilaMovSin