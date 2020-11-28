import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CodePage from './CodePage';
import ReactSpeedometer from "react-d3-speedometer";

function CodeArea(props: any) {

    return (
        <>
            <Row>
                <Col md={5}>
                    <CodePage
                        code={props.plagiarism_data.submission1[props.plagiarism_data[props.index].submission1.file]}
                        filename={props.plagiarism_data[props.index].submission1.file}
                        plagiarized_code_lines={props.plagiarism_data[props.index].submission1.lines}
                    />
                </Col>
                <Col md={2} className='my-auto speedometer'>
                <ReactSpeedometer
                 value={props.plagiarism_data.score}
                 maxValue={100}
                width={180}
                height={120}
                />
                    </Col>
                <Col md={5}>
                    <CodePage
                        code={props.plagiarism_data.submission2[props.plagiarism_data[props.index].submission2.file]}
                        filename={props.plagiarism_data[props.index].submission2.file}
                        plagiarized_code_lines={props.plagiarism_data[props.index].submission2.lines}
                    />
                </Col>
            </Row>
         
        </>
    );

}

export default CodeArea;