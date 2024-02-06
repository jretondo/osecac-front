import React, { useEffect, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { useDropzone } from 'react-dropzone';

const BeforeImported = ({
    setExcelFile,
    setExcelFileArray
}) => {

    function StyledDropzone(props) {
        return (
            <div className="container" style={{ marginBottom: "10px" }}>
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} onChange={async e => {
                        setExcelFile(e.target.files[0])
                        setExcelFileArray(await e.target.files[0].arrayBuffer())
                    }} />
                    <p style={{ marginTop: "40px" }}>Arrastre aquí el Excel del banco</p>
                </div>
            </div>
        );
    }
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
        height: "150px"
    };

    const activeStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
        // eslint-disable-next-line
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);



    useEffect(() => {
        // eslint-disable-next-line
        acceptedFiles.map(file => {
            setExcelFile(file)
        })
        // eslint-disable-next-line
    }, [acceptedFiles])

    return (<>
        <StyledDropzone />
        <Row>
            <Col md="12" style={{ textAlign: "center", marginBottom: "30px" }}>
                <h3>O</h3>
                <button className="btn btn-primary" style={{ margin: 0 }} onClick={e => {
                    e.preventDefault()
                    document.getElementById("selectFile").click()

                }} >Elija un Archivo</button>
                <br />
                <input type="file" placeholder="Seleccione archivo" id="selectFile" style={{ visibility: "hidden" }} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={async (e) => {
                    setExcelFile(e.target.files[0])
                    setExcelFileArray(await e.target.files[0].arrayBuffer())
                }} />
            </Col>
        </Row>
    </>)
}

export default BeforeImported