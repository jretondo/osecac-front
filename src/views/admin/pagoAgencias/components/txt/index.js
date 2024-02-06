import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1';
import React, { useState } from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap';
import FormTransf from './components/formTr'
import ListaTransf from './components/listatransf';

const TxtGeneratorPay = ({
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
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Generador de TXT para pagos masivos</h2>
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
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Generador de TXT para pagos masivos</h2>
                </CardHeader>
            </Card>
        )
    }
}

export default TxtGeneratorPay