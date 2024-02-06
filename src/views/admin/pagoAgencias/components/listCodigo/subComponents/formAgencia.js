import React, { useEffect, useState } from 'react'
import { CardBody, Col, Form, FormFeedback, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import BtnDisabled from '../../../../../../assets/img/icons/btn-disabled.png'
import BtnEnabled from '../../../../../../assets/img/icons/btn-enabled.png'
import swal from 'sweetalert'
import axios from 'axios'
import UrlNodeServer from '../../../../../../api/NodeServer'

const FormAgencia = ({
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
    const [loading, setLoanding] = useState(false)
    const [dataBankBool, setdataBankBool] = useState(false)
    const [agencia, setAgencia] = useState("")
    const [localidad, setlocalidad] = useState("")
    const [telefono, settelefono] = useState("")
    const [responsable, setResponsable] = useState("")
    const [email, setEmail] = useState("")
    const [nombreCbu, setNombreCbu] = useState("")
    const [cbu, setCbu] = useState("")
    const [banco, setBanco] = useState("")
    const [cuit, setCuit] = useState("")
    const [invalidCbu, setInvalidCbu] = useState(false)
    const [invalidCuit, setInvalidCuit] = useState(false)
    const [nombreChq, setNombreChq] = useState("")

    useEffect(() => {
        if (invalidCbu) {
            setInvalidCbu(false)
        }
        // eslint-disable-next-line
    }, [cbu])

    useEffect(() => {
        if (invalidCuit) {
            setInvalidCuit(false)
        }
        // eslint-disable-next-line
    }, [cuit])

    useEffect(() => {
        ResetFormbanco()
    }, [dataBankBool])

    useEffect(() => {
        if (detallesBool) {
            Detalles()
        }
        // eslint-disable-next-line
    }, [detallesBool])

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

    const NvaAgencia = async () => {
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
                raz_soc: agencia,
                localidad: localidad,
                encargado: responsable,
                telefono: telefono,
                email: email,
                tipo_prov: 1,
                nombre_chq: nombreChq,
                cbu: "",
                banco: "",
                cuit: "",
                nombre_bco: ""
            }

            if (dataBankBool) {
                data.cbu = cbu
                data.banco = banco
                data.cuit = cuit
                data.nombre_bco = nombreCbu
            }

            if (detallesBool) {
                data.id = idDetalle
            }

            await axios.post(UrlNodeServer.proveedoresDir.proveedores, data, {
                headers:
                    { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
            })
                .then(res => {
                    const respuesta = res.data
                    const status = parseInt(respuesta.status)
                    if (status === 201) {
                        if (detallesBool) {
                            setActividadStr("El usuario ha modificado la agencia " + agencia)
                            setMsgStrong("Agencia modificado con éxito!")
                            setNvaActCall(!nvaActCall)
                            setMsgGralAlert("")
                            setSuccessAlert(true)
                            setAlertar(!alertar)
                            setLoanding(false)
                            setNvoForm(false)
                        } else {
                            setActividadStr("El usuario ha agregado la agencia " + agencia)
                            setMsgStrong("Agencia agregada con éxito!")
                            setNvaActCall(!nvaActCall)
                            setMsgGralAlert("")
                            setSuccessAlert(true)
                            setAlertar(!alertar)
                            setLoanding(false)
                            ResetFormNormal()
                            ResetFormbanco()
                            document.getElementById("agenciaTxt").focus()
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

    const ResetFormbanco = () => {
        setNombreCbu("")
        setCbu("")
        setBanco("")
        setCuit("")
        setInvalidCbu(false)
        setInvalidCuit(false)
    }

    const ResetFormNormal = () => {
        setNombreChq("")
        setAgencia("")
        setlocalidad("")
        settelefono("")
        setResponsable("")
        setEmail("")
    }

    const Detalles = async () => {
        setLoanding(true)
        await axios.get(`${UrlNodeServer.proveedoresDir.sub.getOne}/${idDetalle}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                setLoanding(false)
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    const agenciaData = respuesta.body[0]
                    if (agenciaData.cbu.length > 0) {
                        setdataBankBool(true)
                    }
                    setAgencia(agenciaData.raz_soc)
                    setlocalidad(agenciaData.localidad)
                    settelefono(agenciaData.telefono)
                    setResponsable(agenciaData.encargado)
                    setEmail(agenciaData.email)
                    setNombreCbu(agenciaData.nombre_bco)
                    setCbu(agenciaData.cbu)
                    setBanco(agenciaData.banco)
                    setCuit(agenciaData.cuit)
                    setNombreChq(agenciaData.nombre_chq)
                } else {
                    setMsgStrong("Hubo un error al querer eliminar el Extracto")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                    setDetallesBool(false)
                }
            })
            .catch(() => {
                setLoanding(false)
                setMsgStrong("Hubo un error al querer eliminar el Extracto")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setDetallesBool(false)
            })
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
                    NvaAgencia();
                }}>
                    <Row>
                        <Col md="8">
                            <FormGroup>
                                <Label for="agenciaTxt">Agencia</Label>
                                <Input type="text" id="agenciaTxt" placeholder="Ingrese la agencia..." value={agencia} onChange={e => setAgencia(e.target.value)} required />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label for="localidadTxt">Localidad</Label>
                                <Input type="text" id="localidadTxt" placeholder="Ingrese la localidad..." value={localidad} onChange={e => setlocalidad(e.target.value)} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <Label for="responsableTxt">Responsable</Label>
                                <Input type="text" id="responsableTxt" placeholder="Responsable de la agencia..." value={responsable} onChange={e => setResponsable(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label for="emailTxt">Email</Label>
                                <Input type="email" id="emailTxt" placeholder="Email de contacto..." value={email} onChange={e => setEmail(e.target.value)} required />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label for="telefonoTxt">Telefóno</Label>
                                <Input type="text" id="telefonoTxt" placeholder="Telefóno de contacto..." value={telefono} onChange={e => settelefono(e.target.value)} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label for="nombreChqTxt">Cheques a nombre de:</Label>
                                <Input type="text" id="nombreChqTxt" placeholder="Nombre del cobro del cheque..." value={nombreChq} onChange={e => setNombreChq(e.target.value)} required />
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
                                    <Col md="8">
                                        <FormGroup>
                                            <Label for="nombreBcoTxt">Razón Social (Cta. Bancaria)</Label>
                                            <Input type="text" id="nombreBcoTxt" placeholder="Propietario de la cuenta..." value={nombreCbu} onChange={e => setNombreCbu(e.target.value)} required />
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup>
                                            <Label for="cuitTxt">CUIT</Label>
                                            <Input invalid={invalidCuit} type="number" id="cuitTxt" placeholder="CUIT del propietario..." value={cuit} onChange={e => setCuit(e.target.value)} required onBlur={() => validarLargo(cuit, 11, setInvalidCuit)} />
                                            <FormFeedback>El CUIT es inválido! Reviselo.</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="cbuTxt">CBU</Label>
                                            <Input invalid={invalidCbu} type="number" id="cbuTxt" placeholder="CBU de la cuenta..." value={cbu} onChange={e => setCbu(e.target.value)} onBlur={() => validarLargo(cbu, 22, setInvalidCbu)} required />
                                            <FormFeedback>El CBU no tiene 22 carácteres! Reviselo.</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="bancoTxt">Banco</Label>
                                            <Input type="text" id="bancoTxt" placeholder="Nombre del banco..." value={banco} onChange={e => setBanco(e.target.value)} required />
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

export default FormAgencia