import React, { useState } from 'react'
import { Col, Row, Tooltip } from 'reactstrap'

const ButtonToggle = ({
    symbol,
    textToDo,
    toogle,
    setToggle,
    tittle
}) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <Row>
            <Col md="12" style={{ textAlign: "right" }}>
                <h2 className="mb-0" style={{ textAlign: "center" }}>
                    {tittle}
                    <button
                        id="minim1"
                        className="btn btn-primary"
                        onClick={e => {
                            e.preventDefault();
                            setToggle(!toogle);
                        }}
                        style={{ width: "50px", margin: 0, position: "absolute", right: 0, top: "-5px" }}>
                        {symbol}
                    </button>
                </h2>
                <Tooltip placement="top" isOpen={tooltipOpen} target="minim1" toggle={() => setTooltipOpen(!tooltipOpen)}>
                    {textToDo}
                </Tooltip>
            </Col>
        </Row>
    )
}

export default ButtonToggle;