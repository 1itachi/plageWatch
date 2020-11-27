import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './CodeCompare.css'
import CodeArea from './CodeArea';
import { LinkContainer } from 'react-router-bootstrap';
import getCodeSimilarity from '../../services/CodeSimilarity';

const disabled: boolean = false;
const enabled: boolean = true;
const firstPage: number = 1;

interface CodeState {
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
            index: firstPage,
            prev_button: disabled,
            next_button: disabled,
            plagiarism_data:{},
            plagiarism_count: 0,
        };
        this.nextButtonClick = this.nextButtonClick.bind(this);
        this.previousButtonClick = this.previousButtonClick.bind(this);
    }

    async componentDidMount() {
        await this.loadData();

        let { index, plagiarism_count } = this.state;
        if (index < plagiarism_count) {
            this.setState({ next_button: enabled })
        }
        if (index > firstPage) {
            this.setState({ prev_button: enabled })
        }
        
    }

    async loadData() {
        let data: any = await getCodeSimilarity();
        this.setState({plagiarism_data: data[0]});
        this.setState({plagiarism_count: Object.keys(data[0]).length - 3 });
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
                    index={this.state.index}
                    plagiarism_data={this.state.plagiarism_data}

                />
                <Col md={{ span: 2, offset: 11 }}>
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
        )
    }
}

export default CodeCompare;
