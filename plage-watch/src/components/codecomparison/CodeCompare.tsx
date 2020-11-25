import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './CodeCompare.css'
import CodeArea from './CodeArea';

interface CodeState {
    // code1: string;
    // code2: string;
    // filename1: string;
    // filename2: string;
    // plagiarized_code1_lines: Array<number>;
    // plagiarized_code2_lines: Array<number>;
    // score: number;
    index: number
    prev_button: boolean;
    next_button: boolean;
    plagiarism_data: {};
    plagiarism_count: number;
}

class CodeCompare extends React.Component<{}, CodeState> {
    constructor(props: any) {
        super(props)
        this.state =
        {
            index: 1,
            prev_button: false,
            next_button: true,
            plagiarism_data: this.getData(),
            plagiarism_count: 0,
        };
    }

    getData(): {} {
        return {
            "1": {
              "submission1": {
                "file": "./src/test1/Sample1.js",
                "lines": [
                  1,  2,  3,  4,  5,  6,  7,
                  8,  9, 10, 11, 12, 13, 14,
                  15, 16, 17
                ] },
              "submission2":{
                "file":",./src/test2/Sample4.js",
                "lines": [
                1,  2,  3,  4,  5,  6,  7,
                8,  9, 10, 11, 12, 13, 14,
                15, 16, 17
              ]
              }},
            "2": {
              "submission1": {
                "file": "./src/test1/Sample2.js",
                "lines": [
                  10,
                  11
                ]
              },
              "submission2": {
                "file": "./src/test2/Sample3.js",
                "lines": [ 11, 12 ]
            }},
            "3": {
              "submission1": {
                "file": "./src/test1/Sample2.js",
                "lines": [ 3, 4, 5 ]},
              "submission2": {
                "file": ",./src/test2/Sample4.js",
                "lines": [ 6, 7, 8 ]
            }},
            "score": 75.86206896551724
          }
    }

    componentDidMount() {
        this.setState({plagiarism_data: this.getData()});
        this.setState({index:1})   ;
        this.setState({plagiarism_count:Object.keys(this.getData()).length });
        if (this.state.index===1) {
            this.setState({prev_button:false});
        }
        if(this.state.index===this.state.plagiarism_count) {
            this.setState({next_button: false});
        }     
    }

    nextButtonClick() {
        const { index, plagiarism_count } = this.state;
        if (index <= plagiarism_count) {
            this.setState({ index: index - 1 });
        }
        if (index === plagiarism_count) {
            this.setState({ next_button: false });
        } else {
            this.setState({ next_button: true });
        }
    }

    previousButtonClick() {
        const { index } = this.state;
        if (index > 1) {
            this.setState({ index: index - 1 });
        }
        if (index===1) {
            this.setState({prev_button:false});
        }else{
            this.setState({prev_button:true});
        }
    }

    render() {
        return (
            <div className='container'>
                <Row
                    className='mb-1 mt-3'
                >
                    <Col md={{ span: 1, offset: 9 }}>
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
                    <Col md={{ span: 1, offset: 5 }}>
                        <Button
                            variant='primary'
                            className='mx-auto plagiarism-buttons'
                            disabled={!this.state.prev_button}
                            onClick={this.previousButtonClick}
                        >
                            <div className='d-flex'>
                                <i className="fa fa-caret-left my-auto mr-3" aria-hidden="true" />
                                <div>Prev</div>
                            </div>
                        </Button>
                    </Col>
                    <Col md={{ span: 1, offset: 0 }}>
                        <Button
                            variant='primary'
                            className='mx-auto plagiarism-buttons'
                            disabled={!this.state.next_button}
                            onClick={this.nextButtonClick}
                        >
                            <div className='d-flex'>
                                <div>Next</div>
                                <i className="fa fa-caret-right my-auto ml-3" aria-hidden="true" />
                            </div>
                        </Button>
                    </Col>
                </Row>
                <CodeArea
                    // code1={this.state.code1}
                    // code2={this.state.code2}
                    // filename1={this.state.filename1}
                    // filename2={this.state.filename2}
                    // plagiarized_code1_lines={this.state.plagiarized_code1_lines}
                    // plagiarized_code2_lines={this.state.plagiarized_code2_lines}
                    index = {this.state.index}
                    plagiarism_data={this.state.plagiarism_data}

                />
                <Col md={{ span: 2, offset: 11 }}>
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
