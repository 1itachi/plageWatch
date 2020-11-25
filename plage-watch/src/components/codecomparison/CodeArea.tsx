import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CodePage from './CodePage';
import ReactSpeedometer from "react-d3-speedometer";
import * as fs from 'fs';
function CodeArea(props: any) {

    const readFiles = (path:any)=>{
    //    const  selectedFile = "./Sample1.js";
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //     const text = reader.result.toString().trim();
    //     console.log(text);
    // }
    // reader.readAsText("./Sample1.js");
        const text = fs.readFileSync('./Sample1.js');
        console.log(text)

    }

    return (
        <>
            <Row>
                <Col md={5}>
                    <CodePage
                        code={readFiles('')}
                        filename={props.plagiarism_data[props.index].submission1.file}
                        plagiarized_code_lines={props.plagiarism_data[props.index].submission1.lines}
                    />
                </Col>
                <Col md={2} className='my-auto speedometer'>
                <ReactSpeedometer
                 value={50}
                 maxValue={100}
                //  fluidWidth={true}
                width={180}
                height={120}
                />
                    </Col>
                <Col md={5}>
                    <CodePage
                        code={readFiles(props.plagiarism_data[props.index].submission2.file)}
                        filename={props.plagiarism_data[props.index].submission2.file}
                        plagiarized_code_lines={props.plagiarism_data[props.index].submission2.lines}
                    />
                </Col>
            </Row>
         
        </>
    );

}

export default CodeArea;