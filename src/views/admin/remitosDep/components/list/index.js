import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import BuscarRemitos from './buscarMov';

const ListRemitos = () => {
    const [windowToggle, setWindowToggle] = useState(false)
    if (windowToggle) {
        return (
            <Card >
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                        tittle="Buscar Remitos"
                        textToDo="Minimizar"
                    />
                </CardHeader>
                <CardBody>
                    <BuscarRemitos />
                </CardBody>
            </Card>
        )
    } else {
        return (
            <Card className="shadow" >
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                        tittle="Buscar Remitos"
                        textToDo="Máximizar"
                    />
                </CardHeader>
            </Card>
        )
    }
}

export default ListRemitos
