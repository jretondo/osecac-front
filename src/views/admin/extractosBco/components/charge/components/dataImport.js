import ActionsBackend from '../../../../../../context/actionsBackend';
import { numberFormat } from 'function/numberFormat';
import moment from 'moment';
import React, { useContext } from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import API_ROUTES from '../../../../../../api/NodeServer';
import AlertsContext from 'context/alerts';

const DataImport = ({
    lastBalance,
    lastDate,
    newBalance,
    newDate,
    checkedArray,
    dateColumn,
    receiptNumberColumn,
    conceptColumn,
    descriptionColumn,
    amountColumn,
    setLoading,
    setExcelFile
}) => {
    const { axiosPost } = useContext(ActionsBackend)
    const { newAlert, newActivity } = useContext(AlertsContext)

    const dataSend = async () => {
        setLoading(true)
        const data = {
            dataArray: checkedArray,
            dataColumns: {
                dateColumn,
                receiptNumberColumn,
                conceptColumn,
                descriptionColumn,
                amountColumn
            }
        }
        const response = await axiosPost(API_ROUTES.bankStatementsDir.sub.movements, data)
        if (!response.error) {
            newAlert("success", "Información insertada con éxito!", " Verifique en los listados")
            newActivity("El usuario insertó información en el extracto bancario.")
            setExcelFile(false)
        } else {
            newAlert("danger", "Hubo un error al querer inseratr información", "error: " + response.errorMsg)
        }
        setLoading(false)
    }

    return (<>
        <Row>
            <Col md="4">
                <FormGroup>
                    <Label>Última fecha:</Label>
                    <Input type="text" value={moment(new Date(lastDate)).format("DD/MM/YYYY")} disabled />
                </FormGroup>
            </Col>
            <Col md="8">
                <FormGroup>
                    <Label>Último saldo:</Label>
                    <Input type="text" value={"$ " + numberFormat(lastBalance)} disabled />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col md="4">
                <FormGroup>
                    <Label>Nueva fecha:</Label>
                    <Input type="text" value={newDate ? moment(new Date(newDate)).format("DD/MM/YYYY") : ""} disabled />
                </FormGroup>
            </Col>
            <Col md="8">
                <FormGroup>
                    <Label>Nuevo saldo:</Label>
                    <Input type="text" value={newBalance ? ("$ " + numberFormat(newBalance)) : ""} disabled />
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col md="12" style={{ textAlign: "center" }}>
                <Button
                    color="success"
                    disabled={checkedArray.length === 0 && true}
                    onClick={e => {
                        e.preventDefault()
                        dataSend()
                    }}
                >
                    Envíar Información
                </Button>
            </Col>
        </Row>
    </>)
}

export default DataImport