import React, { useEffect, useState } from "react"
import axios from 'axios'
import FilaExtractos from '../../../../../../../../components/subComponents/Listados/SubComponentes/FilaMov2'
import ListadoTable from '../../../../../../../../components/subComponents/Listados/ListadoTable'
import UrlNodeServer from '../../../../../../../../api/NodeServer'
import {
    Spinner
} from "reactstrap"

const titulos = ["Nº Comprobante", "Descripción", "Monto", ""]

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
    const [listado, setListado] = useState(<></>)
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
        if (filtro) {
            let query = `?desde=${desde}&hasta=${hasta}&filtro=${filtroStr}`
            setLoading(true)
            await axios.get(`${UrlNodeServer.extractosDir.sub.busqueda}/${pagina}${query}`, {
                headers:
                    { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
            })
                .then(res => {
                    setLoading(false)
                    const data = res.data.body
                    if (parseInt(data.pages.cantTotal) > 0) {
                        setUltimaPag(data.pages.totalPag)
                        setPages(data.pages)
                        setListado(
                            data.listado.map((item, key) => {
                                let primero
                                if (key === 0) {
                                    primero = true
                                } else {
                                    primero = false
                                }
                                return (
                                    <FilaExtractos
                                        id={key}
                                        key={key}
                                        item={item}
                                        setActividadStr={setActividadStr}
                                        nvaActCall={nvaActCall}
                                        setNvaActCall={setNvaActCall}
                                        alertar={alertar}
                                        setAlertar={setAlertar}
                                        setMsgStrong={setMsgStrong}
                                        setMsgGralAlert={setMsgGralAlert}
                                        setSuccessAlert={setSuccessAlert}
                                        setCall={setCall2}
                                        call={call2}
                                        setEsperar={setLoading}
                                        primero={primero}
                                        pagina={pagina}
                                        setPagina={setPagina}
                                        setDetBool={setDetBool}
                                    />
                                )
                            })
                        )
                    } else {
                        setUltimaPag(1)
                        setPages([])
                        setListado(
                            <tr style={{ textAlign: "center", width: "100%" }}>
                                <td>
                                    No hay movimientos con esos filtros
                                </td>
                            </tr>
                        )
                    }
                })
                .catch(() => {
                    setUltimaPag(1)
                    setPages([])
                    setLoading(false)
                    setListado(
                        <tr style={{ textAlign: "center", width: "100%" }}>
                            <td>
                                No hay movimientos con esos filtros
                            </td>
                        </tr>
                    )
                })
        } else {
            setUltimaPag(1)
            setPages([])
            setListado(
                <tr style={{ textAlign: "center", width: "100%" }}>
                    <td>
                        No hay movimientos con esos filtros
                    </td>
                </tr>
            )
        }
    }
    if (loading) {
        return (
            <>
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div>
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