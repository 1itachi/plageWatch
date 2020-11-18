import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './CodeCompare.css'
import CodeArea from './CodeArea';

interface CodeState {
    code1: string;
    code2: string;
    filename1: string;
    filename2: string;
    plagiarized_code1_lines: Array<number>;
    plagiarized_code2_lines: Array<number>;
}

class CodeCompare extends React.Component<{}, CodeState> {
    constructor(props: any) {
        super(props)
        this.state = {
            code1: `var numbers = new Array(1, 4, 9); 
            var length = numbers.push(undefined); 
            console.log("new numbers is : " + numbers );  
            length = numbers.push(20); 
            console.log("new numbers is : " + numbers );`,
            code2: `var numbers = new Array(1, 4, 9); 
            var length = numbers.push(undefined); 
            console.log("new numbers is : " + numbers );  
            length = numbers.push(20); 
            console.log("new numbers is : " + numbers );`,
            filename1: 'sample1.js',
            filename2: 'sameple2.js',
            plagiarized_code1_lines: [],
            plagiarized_code2_lines: [],

        };
    }

    componentDidMount() {
        this.setState({ plagiarized_code1_lines: [1, 2, 3] })
        this.setState({ plagiarized_code2_lines: [3, 5] })
    }

    render() {
        return (
            <div className='container'>
                <Row
                    className='mb-1 mt-3'
                >
                    <Col md={{span:1,offset:9}}>
                        <Button
                            variant='primary'
                            className='plagiarism-buttons'
                        >
                            <div>Download</div>
                        </Button>
                    </Col>
                    <Col md={1}>
                        <Button
                            variant='primary'
                            className='plagiarism-buttons'
                        >
                            <div>Report</div>
                        </Button>
                    </Col>
                </Row>
                <Row
                    className='mb-3'
                >
                    <Col md={{span:1,offset:5}}>
                        <Button
                            variant='primary'
                            className='mx-auto plagiarism-buttons'
                        >
                            <div className='d-flex'>
                                <i className="fa fa-caret-left my-auto mr-3" aria-hidden="true" />
                                <div>Prev</div>
                            </div>
                        </Button>
                    </Col>
                    <Col md={{span:1,offset:0}}>
                        <Button
                            variant='primary'
                            className='mx-auto plagiarism-buttons'
                        >
                            <div className='d-flex'>
                                <div>Next</div>
                                <i className="fa fa-caret-right my-auto ml-3" aria-hidden="true" />
                            </div>
                        </Button>
                    </Col>
                </Row>
                <CodeArea
                    code1={this.state.code1}
                    code2={this.state.code2}
                    filename1={this.state.filename1}
                    filename2={this.state.filename2}
                    plagiarized_code1_lines={this.state.plagiarized_code1_lines}
                    plagiarized_code2_lines={this.state.plagiarized_code2_lines}
                />
                <Col md={{ span: 2,offset:11 }}>
                <Button
                    variant='primary'
                    className='plagiarism-buttons'
                >
                    Go Back
                </Button>
                </Col>
            </div>
        )
    }
}

export default CodeCompare;
