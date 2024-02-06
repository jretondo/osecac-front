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
    setPagina
}) => {

    const [modal, setModal] = useState(false)


    const DiferenciaMov = async (id) => {
        setModal(true)
    }

    return (
        <>
            <tr key={id}>
                <td style={{ textAlign: "center" }}>
                    {moment(item.fecha, "YYYY-MM-DD").format("DD/MM/YYYY")}
                </td>
                <td style={{ textAlign: "center" }}>
                    {item.nro_cbte}
                </td>
                <td style={{ textAlign: "left" }}>
                    {item.concepto + " " + item.descripcion}
                </td>
                <td style={parseInt(item.monto) > 0 ? { textAlign: "right", color: "green", fontWeight: "bold" } : { textAlign: "right", color: "red", fontWeight: "bold" }}>
                    $ {formatMoney(item.monto)}
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