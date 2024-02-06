import UrlNodeServer from 'api/NodeServer';
import Header from 'components/Headers/Header';
import { UseActivity } from 'Hooks/UseActivity';
import { UseSecureRoutes } from 'Hooks/UseSecureRoutes';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';
import AlertaForm from '../../../components/subComponents/alerts/Alerta1';
import FormRemitos from './components/form';
import ListRemitos from './components/list';

const RemitosDep = () => {
    const [alertar, setAlertar] = useState(false)
    const [msgStrongAlert, setMsgStrong] = useState("")
    const [msgGralAlert, setMsgGralAlert] = useState("")
    const [successAlert, setSuccessAlert] = useState(false)
    const [nvaActCall, setNvaActCall] = useState(false)
    const [actividadStr, setActividadStr] = useState("")
    const [call, setCall] = useState(false)

    const [nvoRemito, setNvoRemito] = useState(true)
    const [idRemito, setIdRemito] = useState(0)

    const { loading, error } = UseSecureRoutes(
        UrlNodeServer.routesDir.sub.libroBanco,
        call
    )
    UseActivity(
        nvaActCall,
        actividadStr
    )

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
                    <ListRemitos

                    />

                    <FormRemitos
                        nvoRemito={nvoRemito}
                        idRemito={idRemito}
                    />
                </Container>
            </>
        )
    }
}

export default RemitosDep
