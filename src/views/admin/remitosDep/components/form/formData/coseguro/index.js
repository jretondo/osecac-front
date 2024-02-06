import React, { useEffect, useState } from 'react';
import { Col, Collapse, FormGroup, Input, Label, Row } from 'reactstrap';
import agenciasList from './agencias.json';

const TipoCoseguro = ({
    setDetalle,
    agSelect,
    setAgselect
}) => {
    const [agenciaId, setAgenciaId] = useState(0)
    const [nameAgSelect, setnameAgSelect] = useState("")
    const [toggle, setToggle] = useState(false)
    const [plantAg, setPlantAg] = useState(<></>)
    const [fecha, setFecha] = useState("")
    useEffect(() => {
        AgenciasOp(agenciasList)
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        if (!agSelect) {
            setnameAgSelect("")
            //document.getElementById("agenciTxt").focus()
        }
    }, [agSelect])

    useEffect(() => {
        if (nameAgSelect) {
            if (nameAgSelect.length === 0) {
                AgenciasOp(agenciasList)
            }
        } else {
            AgenciasOp(agenciasList)
        }
        // eslint-disable-next-line
    }, [nameAgSelect])

    useEffect(() => {
        setDetalle(`BONOS ${nameAgSelect} ${agenciaId === 0 ? fecha : ""}`)
    }, [fecha, nameAgSelect, agenciaId, setDetalle])

    const AgenciasOp = (list) => {
        try {
            setPlantAg(
                // eslint-disable-next-line
                list.map((item, key) => {
                    return (
                        <option key={key} value={item.id} >{item.agencia}</option>
                    )
                })
            )

        } catch (error) {
            console.log(`error`, error)
            setPlantAg(
                // eslint-disable-next-line
                agenciasList.map((item, key) => {
                    return (
                        <option key={key} value={item.id} >{item.agencia}</option>
                    )
                })
            )
        }
    }

    const KeyUp = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            try {
                const value = parseInt(e.target.value)
                const newlist = agenciasList.find(a => a.id === value)
                if (newlist.typeof !== Array) {
                    setnameAgSelect(newlist.agencia)
                    setAgenciaId(newlist.id)
                    setAgselect(true)
                } else {
                    setnameAgSelect(newlist[0].agencia)
                    setAgenciaId(newlist[0].id)
                    setAgselect(true)
                }
            } catch (error) {
                console.log('error', error);
            }
        }
    }

    const ChangeAg = (e) => {
        const value = e.target.value
        setnameAgSelect(value)
        try {
            const newlist = agenciasList.find(a => (a.agencia).toLowerCase().includes(value.toLowerCase()))
            let newArray = []
            if (newlist.typeof !== Array) {
                newArray.push(newlist)
            } else {
                newArray = newlist
            }
            AgenciasOp(newArray)
        } catch (error) {
            AgenciasOp(agenciasList)
        }
    }

    return (<>
        <Row>
            <Col>
                <Label for="agenciTxt">Agencia</Label>
                {
                    agSelect ?
                        <Row>
                            <Col md="8" style={{ marginRight: 0, paddingRight: "5px" }}>
                                <Input disabled value={nameAgSelect} />
                            </Col>
                            <Col md="2" style={{ textAlign: "left", marginLeft: 0, paddingLeft: "5px" }}>
                                <button
                                    type="button"
                                    onClick={e => {
                                        //e.preventDefault();
                                        setAgselect(false);
                                    }}
                                    className="btn btn-danger"
                                >X</button>
                            </Col>
                        </Row> :
                        <>
                            <Input
                                type="text"
                                id="agenciTxt"
                                placeholder="Ingrese la agencia..."
                                value={nameAgSelect}
                                onChange={e => ChangeAg(e)}
                                onBlur={() => setToggle(false)}
                                onFocus={() => setToggle(true)}
                            />
                            <Collapse
                                isOpen={toggle}
                                style={{ position: "absolute", zIndex: 5, width: "92%" }}
                            >
                                <FormGroup>
                                    <Input
                                        type="select"
                                        id="listAgSelect"
                                        multiple
                                        onFocus={() => setToggle(true)}
                                        onClick={(e) => {
                                            if (e.target.text !== undefined) {
                                                setnameAgSelect(e.target.text);
                                                setAgenciaId(parseInt(e.target.value));
                                                setAgselect(true);
                                            }
                                        }}
                                        onKeyUp={e => KeyUp(e)}
                                        onBlur={e => {
                                            KeyUp(e);
                                            setToggle(false);
                                        }}
                                    >
                                        {plantAg}
                                    </Input>
                                </FormGroup>
                            </Collapse>
                        </>
                }
            </Col>
            {
                agenciaId === 0 ?
                    <Col md="4" >
                        <FormGroup>
                            <Label for="fechaCbaTxt">Fecha</Label>
                            <Input type="date" id="fechaCbaTxt" value={fecha} onChange={e => setFecha(e.target.value)} />
                        </FormGroup>
                    </Col> :
                    null
            }
        </Row>
    </>)
}

export default TipoCoseguro
