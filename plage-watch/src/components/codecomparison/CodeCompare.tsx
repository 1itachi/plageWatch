import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './CodeCompare.css'
import CodeArea from './CodeArea';
import { LinkContainer } from 'react-router-bootstrap';

const disabled: boolean = false;
const enabled: boolean = true;
const firstPage: number = 1;

interface ComapareState {
    index: number
    prev_button: boolean;
    next_button: boolean;
    plagiarism_count: number;
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
            plagiarism_count: Object.keys(props.plagiarism_data).length - 3,
        };
        this.nextButtonClick = this.nextButtonClick.bind(this);
        this.previousButtonClick = this.previousButtonClick.bind(this);
    }

    async componentDidMount() {
        let { index, plagiarism_count } = this.state;
        
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
            <div className='container'>
                <Row className='mb-1 mt-3'>
                    <Col
                        xs={{ span: 1, offset: 8 }}
                        sm={{ span: 1, offset: 9 }}
                        lg={{ span: 1, offset: 10 }}
                    >
                        <Button
                            variant='primary'
                            className='plagiarism-buttons'
                        >
                            <div>Download</div>
                        </Button>
                    </Col>
                    <Col
                        xs={{ span: 1, offset: 1 }}
                        lg={{ span: 1, offset: 0 }}
                    >
                        <Button
                            variant='primary'
                            className='plagiarism-buttons'
                        >
                            <div>Report</div>
                        </Button>
                    </Col>
                </Row>
                <Row className='mb-3'>
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
                    plagiarism_data={this.props.plagiarism_data}
                />
                <Col xs={{ span: 3, offset: 10 }} md={{ span: 2, offset: 10 }} lg={{ span: 2, offset: 11 }}>
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
        );
    }
}

export default CodeCompare;
