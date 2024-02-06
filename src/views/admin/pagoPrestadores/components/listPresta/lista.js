import UrlNodeServer from '../../../../../api/NodeServer'
import axios from 'axios'
import ListadoTable from 'components/subComponents/Listados/ListadoTable'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'reactstrap'
import FilaPrestador from 'components/subComponents/Listados/SubComponentes/FilaPrestadores'

const titulos = ["CUIT", "Nombre Prestador", "Email", "Datos Bco.", ""]

const ListadoPresta = ({
    pagina,
    filtro,
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
            query = `?palabra=${filtroStr}`
        } else {
            query = `?palabra=`
        }
        setLoading(true)
        await axios.get(`${UrlNodeServer.prestadoresDir.sub.lista}/${pagina}${query}`, {
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
                            return (
                                <FilaPrestador
                                    id={key}
                                    key={key}
                                    item={item}
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
                                No hay prestadores cargados
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
                            No hay prestadores cargados
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

export default ListadoPresta