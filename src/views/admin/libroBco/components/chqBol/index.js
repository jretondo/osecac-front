import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1';
import React, { useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader
} from "reactstrap";
import ListaChqBol from './listaChqBol'
import PendientesChqBol from './pendientes';

const ChqBol = ({
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    nvaActCall,
    setNvaActCall,
    setActividadStr,
    alertar,
    setAlertar,
    actualizar
}) => {
    const [windowToggle, setWindowToggle] = useState(false)

    if (windowToggle) {
        return (
            <Card className="shadow" style={{ marginBottom: "20px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Chequeras y Boletas (talonarios)</h2>
                </CardHeader>
                <CardBody>
                    <ListaChqBol
                        setMsgStrong={setMsgStrong}
                        setMsgGralAlert={setMsgGralAlert}
                        setSuccessAlert={setSuccessAlert}
                        nvaActCall={nvaActCall}
                        setNvaActCall={setNvaActCall}
                        setActividadStr={setActividadStr}
                        alertar={alertar}
                        setAlertar={setAlertar}
                    />
                </CardBody>
            </Card>
        )
    } else {
        return (
            <Card className="shadow" style={{ marginBottom: "20px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <PendientesChqBol
                        actualizar={actualizar}
                    />
                </CardHeader>
            </Card>
        )
    }
}

export default ChqBol