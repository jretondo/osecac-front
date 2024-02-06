import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import FormDataRemitos from './formData';

const FormRemitos = ({
    nvoRemito,
    idRemito
}) => {
    const [windowToggle, setWindowToggle] = useState(false)
    if (windowToggle) {
        return (
            <Card style={{ marginTop: "15px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                        tittle={nvoRemito ? "Nuevo Remito" : "Remito Nº " + idRemito}
                        textToDo="Minimizar"
                    />
                </CardHeader>
                <CardBody>
                    <FormDataRemitos

                    />
                </CardBody>
            </Card>
        )
    } else {
        return (
            <Card className="shadow" style={{ marginTop: "15px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                        tittle={"Formulario de Remitos"}
                        textToDo="Máximizar"
                    />
                </CardHeader>
            </Card>
        )
    }
}

export default FormRemitos
