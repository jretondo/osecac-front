import API_ROUTES from '../../../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext, useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Spinner } from 'reactstrap';
import AfterImported from './components/afterImported';
import BeforeImported from './components/beforeImported';
import DataImport from './components/dataImport';
import TableSelectColumns from './components/tableSelectColumns';
import { transformToNumberFromCVS } from 'function/transformToNumberExcel';
import { RawDateToDate } from 'function/rawDateToDate';

const ChargeMovements = () => {
    const [dataSheet, setDataSheet] = useState(false)
    const [excelFile, setExcelFile] = useState(false)
    const [excelFileArray, setExcelFileArray] = useState(false)
    const [checkedArray, setCheckedArray] = useState(false)
    const [lastBalance, setLastBalance] = useState(false)
    const [lastDate, setLastDate] = useState(false)
    const [newBalance, setNewBalance] = useState(false)
    const [newDate, setNewDate] = useState(false)

    const [dateColumn, setDateColumn] = useState(0)
    const [receiptNumberColumn, setReceiptNumberColumn] = useState(1)
    const [conceptColumn, setConceptColumn] = useState(2)
    const [descriptionColumn, setDescriptionColumn] = useState(3)
    const [amountColumn, setAmountColumn] = useState(4)

    const [loading, setLoading] = useState(false)

    const { axiosGetQuery } = useContext(ActionsBackend)
    const { newAlert } = useContext(AlertsContext)

    const getLastBalanceDate = async () => {
        setLoading(true)
        const response = await axiosGetQuery(API_ROUTES.bankStatementsDir.sub.balance)
        if (!response.error) {
            setLastBalance(response.data.lastBalance)
            setLastDate(response.data.lastDate)
        } else {
            newAlert("danger", "Hubo un error al querer extraer los saldos", "error: " + response.errorMsg)
        }
        setLoading(false)
    }

    const balanceControl = () => {
        setLoading(true)
        let newExcelArray = []
        if (dataSheet.length > 0) {
            // eslint-disable-next-line
            dataSheet.map((item, key) => {
                const EXCEL_DATE = RawDateToDate(item[dateColumn])
                if (EXCEL_DATE) {
                    let number = transformToNumberFromCVS(item[amountColumn], excelFile.name)
                    item[amountColumn] = number
                    item[dateColumn] = EXCEL_DATE
                    item[conceptColumn] = item[conceptColumn].toString().trim()
                    item[descriptionColumn] = item[descriptionColumn].toString().trim()
                    newExcelArray.push(item)
                }
                if (key === dataSheet.length - 1) {
                    newExcelArray.sort((a, b) => a[dateColumn] - b[dateColumn])
                    newBalanceControl(newExcelArray)
                }
            })
        }
        setLoading(false)
    }

    const newBalanceControl = (excelArray) => {
        let subTotal = 0
        let lastExcelDate = new Date(lastDate)
        let newExcelArray = []
        const FIRST_DATE = new Date(lastDate)
        // eslint-disable-next-line
        excelArray.map((item, key) => {
            const EXCEL_DATE = item[dateColumn]
            if (FIRST_DATE < EXCEL_DATE) {
                let number = item[amountColumn]
                subTotal = subTotal + number
                item[amountColumn] = number
                item[dateColumn] = EXCEL_DATE
                item[conceptColumn] = item[conceptColumn].toString().trim()
                item[descriptionColumn] = item[descriptionColumn].toString().trim()
                newExcelArray.push(item)
            }
            EXCEL_DATE > lastExcelDate && (lastExcelDate = EXCEL_DATE)
            if (key === excelArray.length - 1) {
                subTotal = (Math.round(subTotal * 100)) / 100
                setNewBalance(subTotal + lastBalance)
                setNewDate(lastExcelDate)
                newExcelArray.sort((a, b) => a[dateColumn] - b[dateColumn])
                setCheckedArray(newExcelArray)
                newAlert("success", "Archivo procesado con éxito!", "Controle el saldo antes de envíar!")
            }
        })
    }

    useEffect(() => {
        if (!excelFile) {
            setNewBalance(false)
            setNewDate(false)
            setCheckedArray([])
        }
        excelFile && getLastBalanceDate()
        // eslint-disable-next-line
    }, [excelFile])

    return (<>
        <Card>
            <CardBody>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Importar Excel con datos bancarios</h2>
                {
                    loading ?
                        <Row>
                            <Col md="12" style={{ textAlign: "center" }}>
                                <Spinner style={{ width: "250px", height: "250px" }} />
                                <h3>Procesando información...</h3>
                            </Col>
                        </Row>
                        :
                        <>
                            {
                                excelFile ?
                                    <Row style={{ marginBottom: "30px" }}>
                                        <Col md="6">
                                            <AfterImported
                                                setExcelFile={setExcelFile}
                                                setExcelFileArray={setExcelFileArray}
                                                excelFile={excelFile}
                                                excelFileArray={excelFileArray}
                                                setDataSheet={setDataSheet}
                                                dataSheet={dataSheet}
                                                checkedArray={checkedArray}
                                                balanceControl={() => balanceControl()}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <DataImport
                                                lastBalance={lastBalance}
                                                lastDate={lastDate}
                                                newBalance={newBalance}
                                                newDate={newDate}
                                                checkedArray={checkedArray}
                                                dateColumn={dateColumn}
                                                receiptNumberColumn={receiptNumberColumn}
                                                conceptColumn={conceptColumn}
                                                descriptionColumn={descriptionColumn}
                                                amountColumn={amountColumn}
                                                setLoading={setLoading}
                                                setExcelFile={setExcelFile}
                                            />
                                        </Col>
                                    </Row> :
                                    <BeforeImported
                                        setExcelFile={setExcelFile}
                                        setExcelFileArray={setExcelFileArray}
                                    />
                            }
                            {
                                excelFile && <TableSelectColumns
                                    dataSheet={dataSheet}
                                    excelName={excelFile.name}
                                    dateColumn={dateColumn}
                                    setDateColumn={setDateColumn}
                                    receiptNumberColumn={receiptNumberColumn}
                                    setReceiptNumberColumn={setReceiptNumberColumn}
                                    conceptColumn={conceptColumn}
                                    setConceptColumn={setConceptColumn}
                                    descriptionColumn={descriptionColumn}
                                    setDescriptionColumn={setDescriptionColumn}
                                    amountColumn={amountColumn}
                                    setAmountColumn={setAmountColumn}
                                />
                            }
                        </>
                }
            </CardBody>
        </Card>
    </>)
}

export default ChargeMovements