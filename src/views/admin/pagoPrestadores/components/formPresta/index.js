import UrlNodeServer from '../../../../../api/NodeServer'
import axios from 'axios'
import React, { useState } from 'react'
import { CardBody, Col, Form, FormFeedback, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import swal from 'sweetalert'
import BtnDisabled from '../../../../../assets/img/icons/btn-disabled.png'
import BtnEnabled from '../../../../../assets/img/icons/btn-enabled.png'

const FormPresta = ({
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setAlertar,
    alertar,
    setActividadStr,
    setNvaActCall,
    nvaActCall,
    detallesBool,
    idDetalle,
    setDetallesBool,
    setIdDetalle,
    setCall,
    call,
    setNvoForm
}) => {
    const [tipoCbu, setTipoCbu] = useState("01")
    const [loading, setLoanding] = useState(false)
    const [dataBankBool, setdataBankBool] = useState(false)
    const [invalidCbu, setInvalidCbu] = useState(false)
    const [invalidCuit, setInvalidCuit] = useState(false)
    const [cbu, setCbu] = useState("")
    const [cuit, setCuit] = useState("")
    const [razSoc, setRazSoc] = useState("")
    const [nroPresta, setNroPresta] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")
    const [obs, setObs] = useState("")

    const validarLargo = (campo, cant, cb) => {
        const largo = parseInt(String(campo).length)
        if (largo !== parseInt(cant)) {
            cb(true)
        }
    }

    const validarLargoForm = (campo, cant, cb) => {
        const largo = parseInt(String(campo).length)
        if (largo !== parseInt(cant)) {
            cb(true)
            return false
        } else {
            cb(false)
            return true
        }
    }

    const NvoPresta = async () => {
        let largoCbu = true
        let largoCuit = true

        if (dataBankBool) {
            largoCbu = validarLargoForm(cbu, 22, setInvalidCbu)
            largoCuit = validarLargoForm(cuit, 11, setInvalidCuit)
        }

        if (!largoCbu || !largoCuit) {
            swal(
                "Error en el formulario!",
                `${!largoCbu ? "El CBU cargado es inválido!" : ""}
                ${!largoCuit ? "El CUIT cargado es inválido!" : ""}`,
                "error");
        } else {
            setLoanding(true)
            const data = {
                cuit,
                raz_soc: razSoc,
                nro_prest: nroPresta,
                email,
                telefono: tel,
                observaciones: obs
            }

            if (dataBankBool) {
                data.cbu = cbu
                data.cuit = cuit
            }

            if (detallesBool) {
                data.id = idDetalle
            }

            await axios.post(UrlNodeServer.prestadoresDir.prestadores, data, {
                headers:
                    { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
            })
                .then(res => {
                    const respuesta = res.data
                    const status = parseInt(respuesta.status)
                    if (status === 201) {
                        if (detallesBool) {
                            setActividadStr("El usuario ha modificado el prestador " + razSoc)
                            setMsgStrong("Prestador modificado con éxito!")
                            setNvaActCall(!nvaActCall)
                            setMsgGralAlert("")
                            setSuccessAlert(true)
                            setAlertar(!alertar)
                            setLoanding(false)
                            setNvoForm(false)
                        } else {
                            setActividadStr("El usuario ha agregado el prestador " + razSoc)
                            setMsgStrong("Prestador agregado con éxito!")
                            setNvaActCall(!nvaActCall)
                            setMsgGralAlert("")
                            setSuccessAlert(true)
                            setAlertar(!alertar)
                            setLoanding(false)
                            ResetFormNormal()
                            ResetFormbanco()
                            document.getElementById("cuitTxt").focus()
                        }
                    } else {
                        setLoanding(false)
                        setMsgStrong("Hubo un error inesperado!")
                        setMsgGralAlert("")
                        setSuccessAlert(false)
                        setAlertar(!alertar)
                    }
                })
                .catch(() => {
                    setLoanding(false)
                    setMsgStrong("Hubo un error inesperado!")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                })
        }
    }

    const ResetFormNormal = () => {
        setCbu("")
        setCuit("")
        setRazSoc("")
        setNroPresta("")
        setEmail("")
        setTel("")
        setObs("")
        setInvalidCuit(false)
    }

    const ResetFormbanco = () => {
        setCbu("")
        setTipoCbu("01")
        setInvalidCbu(false)
    }

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
            </div>
        )
    } else {
        return (
            <CardBody>
                <Form onSubmit={e => {
                    e.preventDefault();
                    NvoPresta();
                }}>
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <Label for="cuitTxt">CUIT</Label>
                                <Input invalid={invalidCuit} type="text" id="cuitTxt" placeholder="CUIT..." value={cuit} onChange={e => setCuit(e.target.value)} onBlur={() => validarLargo(cuit, 11, setInvalidCuit)} required />
                                <FormFeedback>El CUIT debe tener 11 carácteres! Reviselo.</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md="8">
                            <FormGroup>
                                <Label for="razSocTxt">Razón Social</Label>
                                <Input type="text" id="razSocTxt" placeholder="Razón Social..." value={razSoc} onChange={e => setRazSoc((e.target.value).toUpperCase())} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2">
                            <FormGroup>
                                <Label for="nroPrestaTxt">Nº Presta.</Label>
                                <Input type="text" id="nroPrestaTxt" placeholder="Nº Prestador..." value={nroPresta} onChange={e => setNroPresta(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="razSocTxt">Email</Label>
                                <Input type="email" id="razSocTxt" placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label for="telefonoTxt">Telefóno</Label>
                                <Input type="text" id="telefonoTxt" placeholder="Telefóno..." value={tel} onChange={e => setTel(e.target.value)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" >
                            <FormGroup>
                                <Label for="obsTxt">Observaciones</Label>
                                <Input type="textarea" id="obsTxt" value={obs} onChange={e => setObs(e.target.value)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label style={{ fontWeight: "bold" }} for="datosBancBool">Datos Bancarios:</Label>
                                <br />
                                <img style={{ width: "100px" }} id="datosBancBool" src={dataBankBool ? BtnEnabled : BtnDisabled} alt="Sin_datos_banco" onClick={() => setdataBankBool(!dataBankBool)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    {
                        dataBankBool ?
                            <>
                                <Row>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label for="tipoCbuTxt" >Tipo Cuenta</Label>
                                            <Input type="select" id="tipoCbuTxt" value={tipoCbu} onChange={e => setTipoCbu(e.target.value)}>
                                                <option value={"01"}>Caja de Ahorros</option>
                                                <option value={"03"}>Cuenta Corriente</option>
                                                <option value={"06"}>Especial Persona Juridica</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md="8">
                                        <FormGroup>
                                            <Label for="cbuTxt">CBU</Label>
                                            <Input invalid={invalidCbu} type="number" id="cbuTxt" placeholder="CBU de la cuenta..." value={cbu} onChange={e => setCbu(e.target.value)} onBlur={() => validarLargo(cbu, 22, setInvalidCbu)} required />
                                            <FormFeedback>El CBU debe tener 22 carácteres! Reviselo.</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </> :
                            null
                    }
                    <Row>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <button
                                className="btn btn-primary"
                                style={{
                                    margin: "25px",
                                    width: "180px"
                                }}
                                type="submit"
                            >{detallesBool ? "Modificar Agencia" : "Agregar Agencia"}</button>
                            <button
                                className="btn btn-danger"
                                style={{
                                    margin: "25px",
                                    width: "180px"
                                }}
                                onClick={e => {
                                    e.preventDefault();
                                    setNvoForm(false);
                                }}
                            >Cancelar</button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        )
    }
}

export default FormPresta