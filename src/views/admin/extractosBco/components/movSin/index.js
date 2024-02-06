import UrlNodeServer from 'api/NodeServer'
import axios from 'axios'
import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1'
import React, { useState, useEffect } from 'react'
import { Card, CardHeader } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import Listado from './list'

const MovSinIdentificar = ({
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
    const [windowToggle, setWindowToggle] = useState(false)

    useEffect(() => {
        MovSin()
        // eslint-disable-next-line
    }, [])

    const MovSin = async () => {
        await axios.get(`${UrlNodeServer.extractosDir.sub.sinAsignar}`, {
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

    if (windowToggle) {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={
                            windowToggle ? "-" : "+"
                        }
                        textToDo={
                            windowToggle ? "Minimizar" : "Maximizar"
                        }
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Movimientos sin asignar</h2>
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
        )
    } else {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={
                            windowToggle ? "-" : "+"
                        }
                        textToDo={
                            windowToggle ? "Minimizar" : "Maximizar"
                        }
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Movimientos sin asignar</h2>
                </CardHeader>
            </Card>
        )
    }
}

export default MovSinIdentificar