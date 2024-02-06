import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import ExcelPNG from 'assets/img/icons/excel.png'
import { read, utils } from 'xlsx';

const AfterImported = ({
    setExcelFile,
    setExcelFileArray,
    excelFile,
    excelFileArray,
    setDataSheet,
    balanceControl
}) => {

    const getDataSheet = (file) => {
        const workBook = read(file)
        const sheets = workBook.SheetNames;
        const sheet1 = sheets[0]
        setDataSheet(utils.sheet_to_json(workBook.Sheets[sheet1], { header: 1, raw: false }))
    }

    useEffect(() => {
        excelFileArray && getDataSheet(excelFileArray)
        // eslint-disable-next-line
    }, [excelFileArray])

    return (<>
        <Row style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <Col md="12" style={{ textAlign: "center" }}>
                <button
                    className="btn btn-danger"
                    onClick={e => {
                        setExcelFile(false)
                        setExcelFileArray(false)
                    }}
                    style={{ position: "relative", right: "-120px", top: "-40px" }}
                > X
                </button>
                <img src={ExcelPNG} style={{ width: "80px" }} alt="Excel" />
                <h3 style={{ color: "green" }}>{excelFile.name}</h3>
            </Col>
        </Row>
        <Row>
            <Col md="12" style={{ textAlign: "center" }}>
                <button className="btn btn-warning" style={{ marginBottom: "30px" }} onClick={e => {
                    e.preventDefault()
                    balanceControl()
                }} >Procesar Archivo</button>
            </Col>
        </Row>
    </>)
}

export default AfterImported