import UrlNodeServer from '../../../../../../api/NodeServer'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Collapse, FormGroup, Input, Label, Row } from 'reactstrap'

const ListAgenciasOp = ({
    setAgenciaId,
    agSelect,
    setAgselect
}) => {
    const [lista, setlista] = useState([])
    const [nameAgSelect, setnameAgSelect] = useState("")
    const [toggle, setToggle] = useState(false)
    const [plantAg, setPlantAg] = useState(<></>)

    useEffect(() => {
        listAg()
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        if (!agSelect) {
            setnameAgSelect("")
            document.getElementById("agenciTxt").focus()
        }
    }, [agSelect])

    useEffect(() => {
        if (nameAgSelect) {
            if (nameAgSelect.length === 0) {
                AgenciasOp(lista)
            }
        } else {
            AgenciasOp(lista)
        }
        // eslint-disable-next-line
    }, [nameAgSelect])

    const listAg = async () => {

        const query = `?palabra=&tipo=1&cbu=true`

        await axios.get(`${UrlNodeServer.proveedoresDir.proveedores}/${query}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                const data = res.data.body
                setlista(data)
                AgenciasOp(data)
            })
            .catch(() => {
                setlista([])
            })
    }

    const AgenciasOp = (list) => {
        try {
            setPlantAg(
                // eslint-disable-next-line
                list.map((item, key) => {
                    return (
                        <option key={key} value={item.id} >{item.raz_soc}</option>
                    )
                })
            )

        } catch (error) {
            console.log(`error`, error)
            setPlantAg(
                // eslint-disable-next-line
                lista.map((item, key) => {
                    return (
                        <option key={key} value={item.id} >{item.raz_soc}</option>
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
                const newlist = lista.find(a => a.id === value)
                if (newlist.typeof !== Array) {
                    setnameAgSelect(newlist.raz_soc)
                    setAgenciaId(newlist.id)
                    setAgselect(true)
                } else {
                    setnameAgSelect(newlist[0].raz_soc)
                    setAgenciaId(newlist[0].id)
                    setAgselect(true)
                }
            } catch (error) {

            }
        }
    }

    const ChangeAg = (e) => {
        const value = e.target.value
        setnameAgSelect(value)
        try {
            const newlist = lista.find(a => (a.raz_soc).toLowerCase().includes(value.toLowerCase()))
            let newArray = []
            if (newlist.typeof !== Array) {
                newArray.push(newlist)
            } else {
                newArray = newlist
            }
            AgenciasOp(newArray)
        } catch (error) {
            AgenciasOp(lista)
        }
    }

    return (
        <FormGroup>
            <Label for="agenciTxt">Agencia</Label>
            {
                agSelect ?
                    <Row>
                        <Col md="10" style={{ marginRight: 0, paddingRight: "5px" }}>
                            <Input disabled value={nameAgSelect} />
                        </Col>
                        <Col md="2" style={{ textAlign: "left", marginLeft: 0, paddingLeft: "5px" }}>
                            <button
                                onClick={e => {
                                    e.preventDefault();
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
        </FormGroup>
    )
}

export default ListAgenciasOp