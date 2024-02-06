import UrlNodeServer from 'api/NodeServer';
import axios from 'axios';
import formatMoney from 'Function/NumberFormat';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import ModalAddObs from '../../transfPend/list/modalAddObs';

const TransfRow = ({
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
    setLoading,
    trigger
}) => {
    const [modal, setModal] = useState(false)

    const ChangeTypeMov = async (marcar) => {
        let marca = 1
        if (marcar) {
            marca = 0
        }
        const datos = {
            set: {
                conciliado: marca
            }
        }
        setLoading(true)
        await axios.patch(`${UrlNodeServer.conciliacionDir.conciliacion}/${item.id}`, datos, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    setActividadStr("El usuario ha marcado como contabilizado el movimiento de ID: " + item.id)
                    setNvaActCall(nvaActCall)
                    setMsgStrong("Contabilizado correctamente! ")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                    setCall(!call)
                } else {
                    setMsgStrong("No se pudo contabilizar la transferencia ")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch((error) => {
                console.error(error);
                setMsgStrong("No se pudo contabilizar la transferencia ")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
            }).finally(() => {
                setLoading(false)
            })
    }
    return (
        <>
            <tr key={id} style={parseInt(item.tipo) === 0 ? { background: "#f44c4c", color: "white" } :
                parseInt(item.tipo) === 1 ? { background: "#614cf4", color: "white" } :
                    parseInt(item.tipo) === 2 ? { background: "#f44cca", color: "white" } : {}} >
                <td style={{ textAlign: "center" }}>
                    {moment(item.fecha).format("DD/MM/YYYY")}
                </td>
                <td style={{ textAlign: "center" }}>
                    {moment(item.fecha_dep).format("DD/MM/YYYY")}
                </td>
                {/*           
            <td style={{ textAlign: "left" }}>
                {
                    item.descripcion === "" ? item.concepto : `${item.descripcion}`
                }
            </td>
           */}
                <td style={{ textAlign: "center" }}>
                    {item.oficina}
                </td>
                <td style={{ textAlign: "right", fontWeight: "bold" }}>
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
                                    e.preventDefault();
                                    ChangeTypeMov(true)
                                }}
                            >
                                <i className="fas fa-check"></i>
                                Marcar como no rendida
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault();
                                    setModal(true)
                                }}
                            >
                                <i className="fas fa-eye"></i>
                                Ver Detalle
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

export default TransfRow