import { TableList } from 'components/Lists/TableListExcel';
import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import ExcelMovementRow from './excelMovementRow';

const TableSelectColumns = ({
    dataSheet,
    excelName,
    dateColumn,
    setDateColumn,
    receiptNumberColumn,
    setReceiptNumberColumn,
    conceptColumn,
    setConceptColumn,
    descriptionColumn,
    setDescriptionColumn,
    amountColumn,
    setAmountColumn,
}) => {
    const [columnsLetters, setColumnsLetters] = useState([])
    const [itemsRows, setItemsRows] = useState([])


    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const generateLettersArray = (data) => {
        const letters = []
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                letters.push(alphabet.slice(i, i + 1))
            }
        }
        setColumnsLetters([...letters])
    }

    const generateDataRows = useCallback((data) => {
        if (data.length > 0) {
            let movements = data
            movements.length > 30 && (movements = movements.slice(0, 30))
            setItemsRows(
                // eslint-disable-next-line
                movements.map((item, key) => {
                    return (<ExcelMovementRow
                        key={key}
                        id={key}
                        item={item}
                        dateColumn={dateColumn}
                        amountColumn={amountColumn}
                        excelName={excelName}
                    />)
                })
            )
        }
    }, [dateColumn, amountColumn, excelName])

    useEffect(() => {
        dataSheet && generateLettersArray(dataSheet[dataSheet.length - 1])
        dataSheet && generateDataRows(dataSheet)
    }, [dataSheet, dateColumn, amountColumn, generateDataRows])

    return (<>
        <Container style={{ border: "3px solid", paddingTop: "10px", marginBottom: "15px" }}>
            <h3>Información por columnas:</h3>
            <Row >
                <Col md="1"></Col>
                <Col md="2">
                    <FormGroup>
                        <Label>Fecha:</Label>
                        <Input type="select" value={dateColumn} onChange={e => setDateColumn(e.target.value)}>
                            {// eslint-disable-next-line
                                columnsLetters.length > 0 && columnsLetters.map((item, key) => {
                                    return (
                                        item.length > 0 && <option value={key} key={key} >{item}</option>
                                    )
                                })}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <Label>Nº Cbte.:</Label>
                        <Input type="select" value={receiptNumberColumn} onChange={e => setReceiptNumberColumn(e.target.value)}>
                            {// eslint-disable-next-line
                                columnsLetters.length > 0 && columnsLetters.map((item, key) => {
                                    return (
                                        item.length > 0 && <option value={key} key={key} >{item}</option>
                                    )
                                })}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <Label>Concepto:</Label>
                        <Input type="select" value={conceptColumn} onChange={e => setConceptColumn(e.target.value)}>
                            {// eslint-disable-next-line
                                columnsLetters.length > 0 && columnsLetters.map((item, key) => {
                                    return (
                                        item.length > 0 && <option value={key} key={key} >{item}</option>
                                    )
                                })}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <Label>Descripción:</Label>
                        <Input type="select" value={descriptionColumn} onChange={e => setDescriptionColumn(e.target.value)}>
                            {// eslint-disable-next-line
                                columnsLetters.length > 0 && columnsLetters.map((item, key) => {
                                    return (
                                        item.length > 0 && <option value={key} key={key} >{item}</option>
                                    )
                                })}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <Label>Monto:</Label>
                        <Input type="select" value={amountColumn} onChange={e => setAmountColumn(e.target.value)}>
                            {// eslint-disable-next-line
                                columnsLetters.length > 0 && columnsLetters.map((item, key) => {
                                    return (
                                        item.length > 0 && <option value={key} key={key} >{item}</option>
                                    )
                                })}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md="1"></Col>
            </Row>
        </Container>
        <h3>Vista previa:</h3>
        <TableList
            titlesArray={columnsLetters}
        >
            {itemsRows}
        </TableList>
    </>)
}

export default TableSelectColumns