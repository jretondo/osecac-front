import UrlNodeServer from '../../../api/NodeServer'
import axios from 'axios'
import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1'
import React, { useState, useEffect } from 'react'
import { Card, CardHeader, Container, Spinner } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import Listado from './list'
import { UseActivity } from "Hooks/UseActivity"
import { UseSecureRoutes } from '../../../Hooks/UseSecureRoutes'
import Header from "components/Headers/Header.js"
import AlertaForm from '../../../components/subComponents/alerts/Alerta1'
import { Redirect } from "react-router-dom"

const MovSinIdentificar = () => {
    const [alertar, setAlertar] = useState(false)
    const [msgStrongAlert, setMsgStrong] = useState("")
    const [msgGralAlert, setMsgGralAlert] = useState("")
    const [successAlert, setSuccessAlert] = useState(false)
    const [nvaActCall, setNvaActCall] = useState(false)
    const [actividadStr, setActividadStr] = useState("")
    const [call, setCall] = useState(false)

    const [detBool, setDetBool] = useState(false)

    const { loading, error } = UseSecureRoutes(
        UrlNodeServer.routesDir.sub.transferencias,
        call
    )
    UseActivity(
        nvaActCall,
        actividadStr
    )
    const [windowToggle, setWindowToggle] = useState(false)

    useEffect(() => {
        MovSin()
        // eslint-disable-next-line
    }, [])

    const MovSin = async () => {
        await axios.get(`${UrlNodeServer.transferenciasDir.sub.transferencias}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                const data = res.data.body
                if (parseInt(data.length) > 0) {
                    setMsgStrong("Hay movimientos sin asignar tipo de movieminto! ")
                    setMsgGralAlert("Revise y asignele un tipo.")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
    }

    if (error) {
        return (
            <Redirect
                className="text-light"
                to={process.env.PUBLIC_URL + "/auth/login"}
            />
        )
    } else if (loading) {
        return (
            <>
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div>
            </>
        )
    } else {
        if (windowToggle) {
            return (
                <>
                    <Header />
                    <AlertaForm
                        success={successAlert}
                        msgStrong={msgStrongAlert}
                        msgGral={msgGralAlert}
                        alertar={alertar}
                    />
                    <Container className="mt--7" fluid>
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <ButtonToggle
                                    symbol={windowToggle ? "-" : "+"}
                                    textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                                    toogle={windowToggle}
                                    setToggle={setWindowToggle}
                                />
                                <h2 className="mb-0" style={{ textAlign: "center" }}>Transferencias Pendientes</h2>
                            </CardHeader>
                            <CardBody>
                                <Listado
                                    setActividadStr={setActividadStr}
                                    nvaActCall={nvaActCall}
                                    setNvaActCall={setNvaActCall}
                                    setMsgStrong={setMsgStrong}
                                    setMsgGralAlert={setMsgGralAlert}
                                    setSuccessAlert={setSuccessAlert}
                                    setAlertar={setAlertar}
                                    alertar={alertar}
                                    setCall={setCall}
                                    call={call}
                                    setDetBool={setDetBool}
                                />
                            </CardBody>
                        </Card>
                    </Container>
                </>
            )
        } else {
            return (
                <>
                    <Header />
                    <AlertaForm
                        success={successAlert}
                        msgStrong={msgStrongAlert}
                        msgGral={msgGralAlert}
                        alertar={alertar}
                    />
                    <Container className="mt--7" fluid>
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <ButtonToggle
                                    symbol={windowToggle ? "-" : "+"}
                                    textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                                    toogle={windowToggle}
                                    setToggle={setWindowToggle}
                                />
                                <h2 className="mb-0" style={{ textAlign: "center" }}>Transferencias Pendientes</h2>
                            </CardHeader>
                        </Card>
                    </Container>
                </>
            )
        }
    }
}

export default MovSinIdentificar