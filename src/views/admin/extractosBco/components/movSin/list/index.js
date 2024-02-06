import UrlNodeServer from '../../../../../../api/NodeServer'
import axios from 'axios'
import ListadoTable from 'components/subComponents/Listados/ListadoTable'
import React, { useEffect, useState } from 'react'
import {
    Spinner
} from 'reactstrap'
import FilaMovSin from './FilaMovSin'

const titulos = ["Fecha", "Descripción", "Nº Comprobante", "Monto", ""]

const ListSinMov = ({
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
    setDetBool
}) => {
    const [listado, setListado] = useState(<></>)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        listar()
        // eslint-disable-next-line      
    }, [])

    useEffect(() => {
        setListado(<></>)
        listar()
        // eslint-disable-next-line     
    }, [call])

    const listar = async () => {
        setLoading(true)
        await axios.get(`${UrlNodeServer.extractosDir.sub.sinAsignar}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                setLoading(false)
                const data = res.data.body
                if (parseInt(data.length) > 0) {
                    setListado(
                        data.map((item, key) => {
                            return (
                                <FilaMovSin
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
                                    setDetBool={setDetBool}
                                />
                            )
                        })
                    )
                } else {
                    setListado(
                        <tr style={{ textAlign: "center", width: "100%" }}>
                            <td>
                                No hay movimientos sin asignar
                            </td>
                        </tr>
                    )
                }
            })
            .catch((erro) => {
                console.error(erro);
                setLoading(false)
                setListado(
                    <tr style={{ textAlign: "center", width: "100%" }}>
                        <td>
                            No hay movimientos sin asignar
                        </td>
                    </tr>
                )
            })
    }

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
            </div>
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

export default ListSinMov