import React from 'react';
import { Col, Jumbotron, Row } from 'react-bootstrap';
import CodePage from './CodePage';
import ReactSpeedometer from "react-d3-speedometer"

function CodeArea(props: any) {

    return (
        <>
            <Row>
                <Col md={5}>
                    <CodePage
                        code={props.code1}
                        filename={props.filename1}
                        plagiarized_code_lines={props.plagiarized_code1_lines}
                    />
                </Col>
                <Col md={2} className='my-auto test'>
                <ReactSpeedometer
                 value={50}
                 maxValue={100}
                //  fluidWidth={true}
                width={180}
                />
                    </Col>
                <Col md={5}>
                    <CodePage
                        code={props.code2}
                        filename={props.filename2}
                        plagiarized_code_lines={props.plagiarized_code2_lines}
                    />
                </Col>
            </Row>
            {/* <Row>
            <Col md={5}>
            <div>hi</div>
                </Col>
                <Col md={2} className='my-auto'></Col>
                <Col md={5}>
                    <div className=''>hi</div>
                </Col>
            </Row> */}
        </>
    );

}

export default CodeArea;