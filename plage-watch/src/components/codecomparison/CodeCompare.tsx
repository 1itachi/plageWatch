import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './CodeCompare.css'
import CodeArea from './CodeArea';
import { LinkContainer } from 'react-router-bootstrap';
import { JsxEmit } from 'typescript';

const disabled: boolean = false;
const enabled: boolean = true;
const firstPage: number = 1;

interface ComapareState {
    index: number
    prev_button: boolean;
    next_button: boolean;
    plagiarism_count: number;
    plagiarism_data : any;
}
interface ComapareProps {
    plagiarism_data: any;
}
class CodeCompare extends React.Component<ComapareProps, ComapareState> {
    constructor(props: any) {
        super(props)
        this.state =
        {
            index: firstPage,
            prev_button: disabled,
            next_button: disabled,
            plagiarism_count: Object.keys(JSON.parse(localStorage.getItem('data')|| " ")).length - 3,
            plagiarism_data: JSON.parse(localStorage.getItem('data')|| " ")
        };
        this.nextButtonClick = this.nextButtonClick.bind(this);
        this.previousButtonClick = this.previousButtonClick.bind(this);
    }


    async componentDidMount() {
        window.scrollTo(0, 0)
        let { index, plagiarism_count} = this.state;
        if (index < plagiarism_count) {
            this.setState({ next_button: enabled })
        }
        if (index > firstPage) {
            this.setState({ prev_button: enabled })
        }
    }

    nextButtonClick() {
        const { index, plagiarism_count } = this.state;
        if (index <= plagiarism_count) {
            this.setState({ index: index + 1 });
        }
        if (index > firstPage - 1) {
            this.setState({ prev_button: enabled });
        }
        if (index === plagiarism_count - 1) {
            this.setState({ next_button: disabled })
        }

    }

    previousButtonClick() {
        const { index, plagiarism_count } = this.state;
        if (index > firstPage) {
            this.setState({ index: index - 1 });
        }
        if (index <= firstPage + 1) {
            this.setState({ prev_button: disabled });
        }
        if (index === plagiarism_count) {
            this.setState({ next_button: enabled })
        }
    }

    render() {
        return (
           
            <div className='container-fluid'>
             <div>
                <Row className='mb-3 mt-4'>
                    <Col
                        xs={{ span: 1, offset: 4 }}
                        md={{ span: 1, offset: 4 }}
                        lg={{ span: 1, offset: 5 }}
                    >
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
                    <Col
                        xs={{ span: 1, offset: 1 }}
                        sm={{ span: 1, offset: 1 }}
                        md={{ span: 1, offset: 2 }}
                        lg={{ span: 1, offset: 0 }}
                    >
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
                    index={this.state.index}
                    plagiarism_data={this.state.plagiarism_data}
                />
                <Col xs={{ span: 5, offset: 7 }} md={{ span: 2, offset: 10 }} lg={{ span: 1, offset: 11 }}>
                    <LinkContainer to="/home">
                        <Button
                            variant='primary'
                            className='plagiarism-buttons'
                        >
                            Go Back
                        </Button>
                    </LinkContainer>
                </Col>
            </div>
        </div>
        );
    }
}

export default CodeCompare;
