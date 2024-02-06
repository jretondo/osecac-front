import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"
import ModalCbu from './ModalCbuPresta'

const FilaPrestador = ({
    id,
    item,
    setDetallesBool,
    setIdDetalle,
    setNvoForm
}) => {
    const [modalCbu, setModalCbu] = useState(false)

    const VerDetalles = (id) => {
        setNvoForm(true)
        setIdDetalle(id)
        setDetallesBool(true)
    }

    const toggleModalCbu = () => {
        setModalCbu(!modalCbu)
    }

    return (
        <tr key={id} >
            <td style={{ textAlign: "center", width: "15%" }}>
                {item.cuit}
            </td>
            <td style={{ textAlign: "left", width: "30%" }}>
                {`${item.raz_soc} (${item.nro_prest})`}
            </td>
            <td style={{ textAlign: "left", width: "25%" }}>
                <a href={`mailto:${item.email}`}>{item.email}</a>
            </td>
            <td style={{ width: "15%" }}>
                {
                    item.cbu === null ?
                        <button
                            onClick={e => {
                                e.preventDefault();
                                setModalCbu(true)
                            }}
                            className='btn btn-danger'  >
                            No posee
                        </button>
                        :
                        <button
                            onClick={e => {
                                e.preventDefault();
                                setModalCbu(true)
                            }}
                            className='btn btn-primary'>
                            Ver
                        </button>
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
                            onClick={e => {
                                e.preventDefault();
                                VerDetalles(item.id);
                            }}
                        >
                            <i className="fas fa-search"></i>
                            Ver Detalle
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
            <ModalCbu
                modalCbu={modalCbu}
                toggleModalCbu={toggleModalCbu}
                item={item}
            />
        </tr >
    )
}

export default FilaPrestador