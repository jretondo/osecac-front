import React, { useState } from 'react'
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

    const [changePriceAct, setChangePriceAct] = useState(false)
    const [newPrice, setNewPrice] = useState(item.importe)

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

    const actChangePrice = () => {
        setChangePriceAct(true)
        setTimeout(() => {
            document.getElementById("inpNewCostTxt").focus()
            document.getElementById("inpNewCostTxt").select()
        }, 300);
    }

    const changeNewCompra = (e, id) => {
        if (e.keyCode === 13) {
            updatePriceCompra(newPrice, id)
        } else if (e.keyCode === 27) {
            setChangePriceAct(false)
        }
    }

    const updatePriceCompra = (newPrice, id) => {
        setChangePriceAct(false)
        setArrayPagos(pagos => {
            return pagos.map(pago => {
                if (pago.id === id) {
                    pago.importe = (parseInt(newPrice * 100)) / 100
                }
                return pago
            })
        })
    }

    const duplicarTransf = (e, item) => {
        e.preventDefault()
        let newArray = arrayPagos

        const newItem = { ...item, id: `${item.id}${new Date().getTime()}` }
        newArray.push(newItem)
        newArray = newArray.sort(function (a, b) {
            return ('' + a.raz_soc).localeCompare(b.raz_soc);
        })
        console.log('newArray :>> ', newArray);
        setArrayPagos(() => [...newArray])
        setMsgStrong("Duplicado éxitosamente!")
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
                    {item.concepto}
                </td>
                <td style={{ textAlign: "center" }}>
                    {item.motivo}
                </td>
                <td style={{ textAlign: "center" }} onDoubleClick={() => actChangePrice()} >
                    {
                        changePriceAct ?
                            <input id="inpNewCostTxt" value={newPrice} onChange={e => setNewPrice(e.target.value)} onKeyDown={e => changeNewCompra(e, item.id)} /> :
                            "$" + formatMoney(item.importe)
                    }
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
                                onClick={e => duplicarTransf(e, item)}
                            >
                                <i className="fas fa-copy"></i>
                                Duplicar Transferencia
                            </DropdownItem>
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