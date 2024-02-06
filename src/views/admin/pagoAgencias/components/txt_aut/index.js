import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1';
import React, { useState } from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap';
import FormTransf from './components/formTr'
import ListaTransf from './components/listatransf';
import axios from 'axios';
import UrlNodeServer from '../../../../../api/NodeServer';
import { useEffect } from 'react';

const TxtGeneratorPay2 = ({
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert
}) => {
    const [windowToggle, setWindowToggle] = useState(false)
    const [arrayPagos, setArrayPagos] = useState([])
    const [concepto, setConcepto] = useState("")
    const [motivo, setMotivo] = useState("FAC")

    const getAgenciasTransf = async () => {
        const query = `?palabra=&tipo=1&cbu=true`

        await axios.get(`${UrlNodeServer.proveedoresDir.proveedores}/${query}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                let data = res.data.body
                let pagos = []
                if (data.length > 0) {
                    data = data.sort(function (a, b) {
                        return ('' + a.raz_soc).localeCompare(b.raz_soc);
                    })
                    console.log('data :>> ', data);
                    data.map((item, key) => {
                        const data1 = {
                            id: key,
                            cbu: item.cbu,
                            importe: 0,
                            concepto: concepto,
                            motivo: motivo,
                            referencia: "",
                            email: item.email,
                            raz_soc: item.raz_soc
                        }
                        pagos.push(data1)
                        if (key === data.length - 1) {
                            setArrayPagos(pagos)
                        }
                    })
                }
            })
            .catch(() => {
                setArrayPagos([])
            })
    }

    const getComodatoTransf = async () => {
        const query = `?palabra=&tipo=1&cbu=true`

        await axios.get(`${UrlNodeServer.comodatoDir.comodato}/${query}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                let data = res.data.body
                let pagos = []
                if (data.length > 0) {
                    data = data.sort(function (a, b) {
                        return ('' + a.raz_soc).localeCompare(b.raz_soc);
                    })
                    console.log('data :>> ', data);
                    data.map((item, key) => {
                        const data1 = {
                            id: key,
                            cbu: item.cbu,
                            importe: 0,
                            concepto: concepto,
                            motivo: motivo,
                            referencia: "",
                            email: item.email,
                            raz_soc: item.raz_soc
                        }
                        pagos.push(data1)
                        if (key === data.length - 1) {
                            setArrayPagos(pagos)
                        }
                    })
                }
            })
            .catch(() => {
                setArrayPagos([])
            })
    }

    const getCtaSindicalTransf = async () => {
        const query = `?palabra=&tipo=1&cbu=true`

        await axios.get(`${UrlNodeServer.ctaSindicalsDir.ctaSindical}/${query}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                let data = res.data.body
                let pagos = []
                if (data.length > 0) {
                    data = data.sort(function (a, b) {
                        return ('' + a.raz_soc).localeCompare(b.raz_soc);
                    })
                    console.log('data :>> ', data);
                    data.map((item, key) => {
                        const data1 = {
                            id: key,
                            cbu: item.cbu,
                            importe: 0,
                            concepto: concepto,
                            motivo: motivo,
                            referencia: "",
                            email: item.email,
                            raz_soc: item.raz_soc
                        }
                        pagos.push(data1)
                        if (key === data.length - 1) {
                            setArrayPagos(pagos)
                        }
                    })
                }
            })
            .catch(() => {
                setArrayPagos([])
            })
    }

    const getReintBenefTransf = async () => {
        const query = `?palabra=&tipo=1&cbu=true`

        await axios.get(`${UrlNodeServer.reintBenefDir.reintBenef}/${query}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                let data = res.data.body
                let pagos = []
                if (data.length > 0) {
                    data = data.sort(function (a, b) {
                        return ('' + a.raz_soc).localeCompare(b.raz_soc);
                    })
                    console.log('data :>> ', data);
                    data.map((item, key) => {
                        const data1 = {
                            id: key,
                            cbu: item.cbu,
                            importe: 0,
                            concepto: concepto,
                            motivo: motivo,
                            referencia: "",
                            email: item.email,
                            raz_soc: item.raz_soc
                        }
                        pagos.push(data1)
                        if (key === data.length - 1) {
                            setArrayPagos(pagos)
                        }
                    })
                }
            })
            .catch(() => {
                setArrayPagos([])
            })
    }

    if (windowToggle) {
        return (
            <Card className="shadow" style={{ marginTop: "30px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Generador de TXT</h2>
                </CardHeader>
                <CardBody>
                    <FormTransf
                        setArrayPagos={setArrayPagos}
                        arrayPagos={arrayPagos}
                        alertar={alertar}
                        setAlertar={setAlertar}
                        setMsgStrong={setMsgStrong}
                        setMsgGralAlert={setMsgGralAlert}
                        setSuccessAlert={setSuccessAlert}
                        getAgenciasTransf={getAgenciasTransf}
                        getCtaSindicalTransf={getCtaSindicalTransf}
                        getComodatoTransf={getComodatoTransf}
                        getReintBenefTransf={getReintBenefTransf}
                        concepto={concepto}
                        setConcepto={setConcepto}
                        motivo={motivo}
                        setMotivo={setMotivo}
                    />
                </CardBody>
                <CardBody style={{ border: "1px solid red" }}>
                    <ListaTransf
                        arrayPagos={arrayPagos}
                        setArrayPagos={setArrayPagos}
                        alertar={alertar}
                        setAlertar={setAlertar}
                        setMsgStrong={setMsgStrong}
                        setMsgGralAlert={setMsgGralAlert}
                        setSuccessAlert={setSuccessAlert}
                    />
                </CardBody>
            </Card>
        )
    } else {
        return (
            <Card className="shadow" style={{ marginTop: "30px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Generador de TXT</h2>
                </CardHeader>
            </Card>
        )
    }
}

export default TxtGeneratorPay2