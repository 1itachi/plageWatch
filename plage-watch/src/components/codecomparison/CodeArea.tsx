import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CodePage from './CodePage';
import ReactSpeedometer from "react-d3-speedometer";

interface State {
    plag_code1: string;
    plag_code2: string;
    plag_lines1: Array<number>;
    plag_lines2: Array<number>;
    plag_fileName1: string;
    plag_fileName2: string;
    plag_score: number;
}

interface Props {
    index: number;
    plagiarism_data: any;
}

class CodeArea extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            plag_code1: '',
            plag_code2: '',
            plag_lines1: [],
            plag_lines2: [],
            plag_fileName1: '',
            plag_fileName2: '',
            plag_score: 0,
        }
    }

    componentDidUpdate(prevProps: any) {
        const { plagiarism_data, index } = this.props;
        if (prevProps.plagiarism_data !== plagiarism_data || prevProps.index !== index) {
            if (plagiarism_data.submission1 !== undefined) {
                this.setState({
                    plag_code1: plagiarism_data.submission1[plagiarism_data[index].submission1.file],
                    plag_code2: plagiarism_data.submission2[plagiarism_data[index].submission2.file],
                    plag_lines1: plagiarism_data[index].submission1.lines,
                    plag_lines2: plagiarism_data[index].submission2.lines,
                    plag_fileName1: plagiarism_data[index].submission1.file,
                    plag_fileName2: plagiarism_data[index].submission2.file,
                    plag_score: parseInt(plagiarism_data.score.toFixed(2)),
                });
            }
        }
    }

    render() {
        const { plag_code1, plag_code2, plag_lines1, plag_lines2, plag_fileName1, plag_fileName2, plag_score } = this.state;
        return (
            <>
                <Row>
                    <Col lg={{ span: 5, order: 1 }} md={{ span: 12, order: 2 }} xs={{ span: 12, order: 2 }}>
                        <CodePage
                            code={plag_code1}
                            filename={plag_fileName1}
                            plagiarized_code_lines={plag_lines1}
                        />
                    </Col>
                    <Col lg={{ span: 2, order: 2 }} md={{ span: 6, order: 1 }} xs={{ span: 6, order: 1 }} className='my-auto mx-auto speedometer'>
                        <ReactSpeedometer
                            value={plag_score}
                            maxValue={100}
                            fluidWidth={true}
                            startColor='#33CC33'
                            endColor='red'
                            segments={10}
                        />
                    </Col>
                    <Col lg={{ span: 5, order: 3 }} md={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>
                        <CodePage
                            code={plag_code2}
                            filename={plag_fileName2}
                            plagiarized_code_lines={plag_lines2}
                        />
                    </Col>
                </Row>

            </>
        );
    }

}

export default CodeArea;