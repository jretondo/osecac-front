import { numberFormat } from 'function/numberFormat';
import { RawDateToDate } from 'function/rawDateToDate';
import moment from 'moment';
import React from 'react';

const ExcelMovementRow = ({
    id,
    item,
    dateColumn,
    amountColumn,
    excelName
}) => {
    return (<>
        <tr id={id} key={id} >
            {// eslint-disable-next-line
                item.length > 0 && item.map((cell, key) => {
                    let dataCell = cell
                    switch (key) {
                        case parseInt(dateColumn):
                            try {
                                dataCell = RawDateToDate(dataCell)
                                dataCell = moment(dataCell).format("DD/MM/YYYY")
                            } catch (error) {
                                dataCell = cell
                            }
                            break;
                        case parseInt(amountColumn):
                            try {
                                dataCell = dataCell.replace("$", "")
                                dataCell = dataCell.replace(" ", "")
                                dataCell = dataCell.replace(".", "")
                                dataCell = dataCell.replace(",", ".")
                                dataCell = parseFloat(dataCell)
                            } catch (error) { }
                            let excelExtension = ""
                            let point = false
                            for (let i = 0; i < excelName.length; i++) {
                                if (point === true) {
                                    excelExtension = excelExtension + excelName[i]
                                }
                                if (excelName[i] === ".") {
                                    point = true
                                }
                            }
                            if (excelExtension === "csv") {

                                if (isNaN(dataCell)) {
                                    dataCell = cell
                                }
                            }
                            dataCell = numberFormat(dataCell)
                            break;
                        default:
                            dataCell = dataCell.toString()
                            if (dataCell.length > 20) {
                                dataCell = dataCell.slice(0, 20)
                            }
                            break;
                    }
                    try {
                        return (<td style={key % 2 === 0 ? {} : { background: "gray", color: "white" }} key={key}>
                            {dataCell.toString()}
                        </td>)
                    } catch (error) {
                        return (<td key={key}>
                        </td>)
                    }
                })}
        </tr>
    </>)
}

export default ExcelMovementRow