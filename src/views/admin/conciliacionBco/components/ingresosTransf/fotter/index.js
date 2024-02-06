import formatMoney from 'Function/NumberFormat';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'reactstrap';
import CardTransf from './cardTransf';

const TransfIngFooter = ({ transfArray }) => {
    const [amountsLayout, setAmountsLayout] = useState(<></>)

    const calculeAmounts = () => {
        setAmountsLayout(<></>)
        let transfList = transfArray
        transfList.sort((a, b) => a.tipo - b.tipo)
        let bonosAmount = 0
        let actasAmount = 0
        let legalesAmount = 0
        let otrosAmount = 0
        let totalFinal = 0

        let bonosLayout = <></>
        let actasLayout = <></>
        let legalesLayout = <></>
        let otrosLayout = <></>
        let totalFinalLayout = <></>

        transfList.map((item, key) => {
            switch (item.tipo) {
                case 0:
                    actasAmount = actasAmount + item.monto
                    break;
                case 1:
                    legalesAmount = legalesAmount + item.monto
                    break;
                case 2:
                    bonosAmount = bonosAmount + item.monto
                    break;
                case 3:
                    otrosAmount = otrosAmount + item.monto
                    break;
                default:
                    break;
            }

            totalFinal = totalFinal + item.monto

            if (key === transfArray.length - 1) {
                if (actasAmount > 0) {
                    actasLayout = <CardTransf
                        id={0}
                        colSize={3}
                        tittle={"Total Actas"}
                        amount={formatMoney(actasAmount)}
                    />
                } if (legalesAmount > 0) {
                    legalesLayout = <CardTransf
                        id={1}
                        colSize={3}
                        tittle={"Total Legales"}
                        amount={formatMoney(legalesAmount)}
                    />
                } if (bonosAmount > 0) {
                    bonosLayout = <CardTransf
                        id={2}
                        colSize={3}
                        tittle={"Total Bonos"}
                        amount={formatMoney(bonosAmount)}
                    />
                } if (otrosAmount > 0) {
                    otrosLayout = <CardTransf
                        id={3}
                        colSize={3}
                        tittle={"Total Otros"}
                        amount={formatMoney(otrosAmount)}
                    />
                }

                totalFinalLayout = <CardTransf
                    id={4}
                    colSize={3}
                    tittle={"Total Transferencias"}
                    amount={formatMoney(totalFinal)}
                    total={true}
                />


                setAmountsLayout(
                    <>
                        <Row style={{ marginTop: "20px" }}>
                            {actasLayout}
                            {legalesLayout}
                            {bonosLayout}
                            {otrosLayout}
                        </Row>
                        <Row>
                            {totalFinalLayout}
                        </Row>
                    </>

                )
            }
        })
    }

    useEffect(() => {
        calculeAmounts()
    }, [transfArray])

    return (<>

        {amountsLayout}

    </>)
}

export default TransfIngFooter