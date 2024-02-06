import React, { useEffect, useState } from "react"
import axios from 'axios'
import ListadoTable from '../../../../../../components/subComponents/Listados/ListadoTable'
import UrlNodeServer from '../../../../../../api/NodeServer'
import {
    Spinner
} from "reactstrap"
import FilaAgencias from "../../../../../../components/subComponents/Listados/SubComponentes/FilaAgencias"

const titulos = ["Agencia", "Localidad", "Email", ""]

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
    setCall,
    call,
    setPagina,
    setUltimaPag,
    setPages,
    filtroStr,
    setDetallesBool,
    setIdDetalle,
    setNvoForm
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
    }, [call])

    const listar = async () => {
        let query = ""
        if (filtro) {
            query = `?palabra=${filtroStr}&tipo=1`
        } else {
            query = `?palabra=&tipo=1`
        }
        setLoading(true)
        await axios.get(`${UrlNodeServer.proveedoresDir.proveedores}/${pagina}${query}`, {
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
                                <FilaAgencias
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
                                    setCall={setCall}
                                    call={call}
                                    setEsperar={setLoading}
                                    primero={primero}
                                    pagina={pagina}
                                    setPagina={setPagina}
                                    setDetallesBool={setDetallesBool}
                                    setIdDetalle={setIdDetalle}
                                    setNvoForm={setNvoForm}
                                />
                            )
                        })
                    )
                } else {
                    setListado(
                        <tr style={{ textAlign: "center", width: "100%" }}>
                            <td>
                                No hay agencias cargadas
                            </td>
                        </tr>
                    )
                }
            })
            .catch(() => {
                setLoading(false)
                setListado(
                    <tr style={{ textAlign: "center", width: "100%" }}>
                        <td>
                            No hay agencias cargadas
                        </td>
                    </tr>
                )
            })
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