import React, { useState } from 'react'
import Filtro from './components/filtro'
import ListaMov from './components/ListaMov'
import ButtonToggle1 from '../../../../../components/subComponents/buttonToggle/buttonToggle1'
import { Card, CardBody, CardHeader } from 'reactstrap'
import Paginacion from 'components/subComponents/Paginacion/Paginacion'

const BuscarMov = ({
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert
}) => {
    const [desde, setDesde] = useState("")
    const [hasta, setHasta] = useState("")
    const [filtroStr, setFiltroStr] = useState("")
    const [buscar, setBuscar] = useState(false)
    const [windowToggle, setWindowToggle] = useState(false)
    const [pagina, setPagina] = useState(1)
    const [ultimaPag, setUltimaPag] = useState(0)
    const [pages, setPages] = useState([])
    const [call2, setCall2] = useState(false)
    const [plantPaginas, setPlantPaginas] = useState([])

    if (windowToggle) {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <ButtonToggle1
                        symbol={
                            windowToggle ? "-" : "+"
                        }
                        textToDo={
                            windowToggle ? "Minimizar" : "Maximizar"
                        }
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Busqueda de Movimientos</h2>
                </CardHeader>
                <CardBody>
                    <Filtro
                        desde={desde}
                        hasta={hasta}
                        setDesde={setDesde}
                        setHasta={setHasta}
                        setFiltroStr={setFiltroStr}
                        filtroStr={filtroStr}
                        buscar={buscar}
                        setBuscar={setBuscar}
                    />
                    <ListaMov
                        pagina={pagina}
                        setActividadStr={setActividadStr}
                        nvaActCall={nvaActCall}
                        setNvaActCall={setNvaActCall}
                        alertar={alertar}
                        setAlertar={setAlertar}
                        setMsgStrong={setMsgStrong}
                        setMsgGralAlert={setMsgGralAlert}
                        setSuccessAlert={setSuccessAlert}
                        setCall2={setCall2}
                        call2={call2}
                        setUltimaPag={setUltimaPag}
                        setPages={setPages}
                        setPagina={setPagina}
                        setDetBool={buscar}
                        filtroStr={filtroStr}
                        filtro={buscar}
                        setFiltro={setBuscar}
                        desde={desde}
                        hasta={hasta}
                        setPlantPaginas={setPlantPaginas}
                    />
                    <Paginacion
                        setPagina={setPagina}
                        pagina={pagina}
                        plantPaginas={plantPaginas}
                        ultimaPag={ultimaPag}
                        pages={pages}
                        setPlantPaginas={setPlantPaginas}
                        setUltimaPag={setUltimaPag}
                        cantTotal={pages}
                        totalPag={ultimaPag}
                    />
                </CardBody>
            </Card>
        )
    } else {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <ButtonToggle1
                        symbol={
                            windowToggle ? "-" : "+"
                        }
                        textToDo={
                            windowToggle ? "Minimizar" : "Maximizar"
                        }
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Busqueda de Movimientos</h2>
                </CardHeader>
            </Card>
        )
    }
}

export default BuscarMov