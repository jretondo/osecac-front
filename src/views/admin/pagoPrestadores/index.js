import React, { useState, useEffect } from "react"
import UrlNodeServer from '../../../api/NodeServer'
import Header from "components/Headers/Header.js"
import {
    Spinner,
    Container,
} from "reactstrap";
import { Redirect } from "react-router-dom"
import { UseSecureRoutes } from '../../../Hooks/UseSecureRoutes'
import ListPresta from "./components/listPresta";
import { UseActivity } from "Hooks/UseActivity";
import Alert1 from "components/subComponents/alerts/Alerta1";

const Index = () => {
    const [call, setCall] = useState(false)
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

    const { loading, error } = UseSecureRoutes(
        UrlNodeServer.routesDir.sub.pagoPrestadores,
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
                <Alert1
                    success={successAlert}
                    msgStrong={msgStrongAlert}
                    msgGral={msgGralAlert}
                    alertar={alertar}
                />
                <Header />
                <Container className="mt--7" fluid>
                    <ListPresta
                        setActividadStr={setActividadStr}
                        nvaActCall={nvaActCall}
                        setNvaActCall={setNvaActCall}
                        alertar={alertar}
                        setAlertar={setAlertar}
                        setMsgStrong={setMsgStrong}
                        setMsgGralAlert={setMsgGralAlert}
                        setSuccessAlert={setSuccessAlert}
                    />
                </Container>
            </>
        )
    }
}

export default Index;
