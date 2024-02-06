import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"
import formatMoney from 'Function/NumberFormat'
import ModalAddObs from './modalAddObs'
import moment from 'moment'
import UrlNodeServer from '../../../../api/NodeServer'
import axios from 'axios'

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
    call,
    setEsperar
}) => {

    const [modal, setModal] = useState(false)

    const AddObs = () => {
        setModal(true)
    }

    const ChangeTypeMov = async (tipo) => {

        const datos = {
            set: {
                transf_int: tipo
            }
        }
        setEsperar(true)
        await axios.patch(`${UrlNodeServer.transferenciasDir.transferencias}/${item.id}`, datos, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                setEsperar(false)
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    setActividadStr("El usuario ha marcado como contabilizado el movimiento de ID: " + item.id)
                    setNvaActCall(nvaActCall)
                    setMsgStrong("Identificada correctamente! ")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                    setCall(!call)
                } else {
                    setMsgStrong("No se pudo identificar la transferencia ")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch((error) => {
                console.error(error);
                setMsgStrong("No se pudo identificar la transferencia ")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    return (
        <>
            <tr key={id} style={parseInt(item.transf_int) === 1 ? { background: "gray", color: "white" } : parseInt(item.transf_int) === 2 ? { background: "#f44c4c", color: "white" } :
                parseInt(item.transf_int) === 3 ? { background: "#614cf4", color: "white" } :
                    {}} >
                <td style={{ textAlign: "center" }}>
                    {moment(item.fecha).format("DD/MM/YYYY")}
                </td>
                <td style={{ textAlign: "left" }}>
                    {
                        item.descripcion === "" ? item.concepto : `Cred Transf ${item.descripcion}`
                    }
                </td>
                <td style={{ textAlign: "right", fontWeight: "bold" }}>
                    $ {formatMoney(item.monto)}
                </td>
                <td>
                    {item.obs === "" || item.obs === null ? null : <i className="fas fa-eye"></i>}
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
                                disabled={parseInt(item.transf_int) === 1}
                                onClick={e => {
                                    e.preventDefault()
                                    ChangeTypeMov(2)
                                }}
                            >
                                <i className="fas fa-check"></i>
                                Corresponde a Fiscalización
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                disabled={parseInt(item.transf_int) === 1}
                                onClick={e => {
                                    e.preventDefault()
                                    ChangeTypeMov(3)
                                }}
                            >
                                <i className="fas fa-check"></i>
                                Corresponde a Legales
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                disabled={parseInt(item.transf_int) === 1}
                                onClick={e => {
                                    e.preventDefault()
                                    ChangeTypeMov(0)
                                }}
                            >
                                <i className="fas fa-check"></i>
                                No Identificada
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault();
                                    AddObs();
                                }}
                            >
                                <i className="fas fa-eye"></i>
                                Detalles
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr >
            <ModalAddObs
                modal={modal}
                setModal={setModal}
                item={item}
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