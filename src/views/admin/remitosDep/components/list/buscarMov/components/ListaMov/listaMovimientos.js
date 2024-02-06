import React, { useEffect, useState } from "react"
import axios from 'axios'
import FilaExtractos from '../../../../../../../../components/subComponents/Listados/SubComponentes/FilaMov2'
import ListadoTable from '../../../../../../../../components/subComponents/Listados/ListadoTable'
import UrlNodeServer from '../../../../../../../../api/NodeServer'
import {
    Spinner
} from "reactstrap"

const titulos = ["Fecha", "Detalles", "Efectivo", "Cheques", "Total", "Libro", ""]

const ListaExtractos = ({
    pagina,
    filtro,
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setCall2,
    call2,
    setPagina,
    setUltimaPag,
    setPages,
    desde,
    hasta,
    filtroStr,
    setDetBool
}) => {
    const [listado, setListado] = useState(<tr><td></td><td>No hay remitos con estos filtros</td></tr>)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        listar()
        setPagina(1)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        listar()
        setPagina(1)
        // eslint-disable-next-line
    }, [filtro])

    useEffect(() => {
        listar()
        // eslint-disable-next-line
    }, [pagina])

    useEffect(() => {
        listar()
        setPagina(1)
        // eslint-disable-next-line
    }, [call2])

    const listar = async () => {
    }

    if (loading) {
        return (
            <>
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                </div>
            </>
        )
    } else {
        return (
            <ListadoTable
                listado={listado}
                titulos={titulos}
            />
        )
    }
}

export default ListaExtractos