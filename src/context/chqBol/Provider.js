import UrlNodeServer from '../../api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChqBolContext from './index';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://172.21.10.60:3001";

const ChqBolProvider = ({ children }) => {
    const [loadingChqBol, setLoadingChqBol] = useState(false)
    const [errorChqBol, setErrorChqBol] = useState()
    const [totalChq, setTotalChq] = useState(0)
    const [totalBol, setTotalBol] = useState(0)
    const [listadoBol, setListadoBol] = useState([])
    const [listadoChq, setListadoChq] = useState([])
    const [sigChq, setSigChq] = useState(0)
    const [sigBol, setSigBol] = useState(0)
    const [data, setData] = useState({})

    const ultimoChqBol = async () => {
        setErrorChqBol()
        setLoadingChqBol(true)
        await axios.get(UrlNodeServer.libroBcoDir.sub.talonarios, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                setLoadingChqBol(false)
                const respuesta = res.data
                console.log('respuesta :>> ', respuesta);
                setData(respuesta.body)
            })
            .catch((err) => {
                setLoadingChqBol(false)
                setTotalChq(0)
                setErrorChqBol(err)
            })
    }

    const dataProcess = () => {
        try {
            const listaBol = data.listadoBol
            setListadoBol(listaBol)
            const listaChq = data.listadoChq
            setListadoChq(listaChq)
            const sigCbtes = data.sigCbtes
            setSigBol(sigCbtes.sigBol)
            setSigChq(sigCbtes.sigChq)
            let chqPend = 0
            let bolPend = 0
            if (listaBol.length > 0) {
                // eslint-disable-next-line
                listaBol.map((item, key) => {
                    bolPend = bolPend + item.cantPend
                    if (key === listaBol.length - 1) {
                        setTotalBol(bolPend)
                    }
                })
            } else {
                setTotalBol(0)
            }
            if (listaChq.length > 0) {
                // eslint-disable-next-line
                listaChq.map((item, key) => {
                    chqPend = chqPend + item.cantPend
                    if (key === listaChq.length - 1) {
                        setTotalChq(chqPend)
                    }
                })
            } else {
                setTotalChq(0)
            }
        } catch (error) { console.log('error :>> ', error); }
    }

    useEffect(() => {
        dataProcess()
        // eslint-disable-next-line
    }, [data])

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.connect()
        socket.on("FromAPI", data => {
            setData(data.data)
        });
        socket.connect();
        ultimoChqBol()
        return () => socket.disconnect();
    }, []);

    return (
        <ChqBolContext.Provider value={{
            actualizar: ultimoChqBol,
            totalBol,
            totalChq,
            listadoBol,
            listadoChq,
            errorChqBol,
            loadingChqBol,
            sigChq,
            sigBol
        }}>
            {children}
        </ChqBolContext.Provider>
    )
}
export default ChqBolProvider