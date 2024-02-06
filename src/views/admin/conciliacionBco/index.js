import React, { useState, useEffect } from "react"
import UrlNodeServer from '../../../api/NodeServer'
import Header from "components/Headers/Header.js"
import {
    Spinner,
    Container
} from "reactstrap";
import { Redirect } from "react-router-dom"
import { UseSecureRoutes } from '../../../Hooks/UseSecureRoutes'
import TransfPend from './components/transfPend'
import IngresosTransf from './components/ingresosTransf'
import { UseActivity } from "Hooks/UseActivity";
import AlertaForm from '../../../components/subComponents/alerts/Alerta1'

const Index = () => {
    const [alertar, setAlertar] = useState(false)
    const [msgStrongAlert, setMsgStrong] = useState("")
    const [msgGralAlert, setMsgGralAlert] = useState("")
    const [successAlert, setSuccessAlert] = useState(false)
    const [nvaActCall, setNvaActCall] = useState(false)
    const [actividadStr, setActividadStr] = useState("")

    UseActivity(
        nvaActCall,
        actividadStr
    )

    const [call, setCall] = useState(false)
    const { loading, error } = UseSecureRoutes(
        UrlNodeServer.routesDir.sub.conciliacionBancaria,
        call
    )

    useEffect(() => {
        setCall(!call)
        // eslint-disable-next-line
    }, [])

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
                    <TransfPend
                        setActividadStr={setActividadStr}
                        nvaActCall={nvaActCall}
                        setNvaActCall={setNvaActCall}
                        alertar={alertar}
                        setAlertar={setAlertar}
                        setMsgStrong={setMsgStrong}
                        setMsgGralAlert={setMsgGralAlert}
                        setSuccessAlert={setSuccessAlert}
                        call={call}
                        setCall={setCall}
                    />
                    <IngresosTransf
                        setActividadStr={setActividadStr}
                        nvaActCall={nvaActCall}
                        setNvaActCall={setNvaActCall}
                        alertar={alertar}
                        setAlertar={setAlertar}
                        setMsgStrong={setMsgStrong}
                        setMsgGralAlert={setMsgGralAlert}
                        setSuccessAlert={setSuccessAlert}
                        call={call}
                        setCall={setCall}
                    />
                </Container>
            </>
        )
    }
}

export default Index;
