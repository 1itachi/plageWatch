import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './CodeCompare.css'
import CodeArea from './CodeArea';

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
            plagiarism_data: this.getData(),
            plagiarism_count: Object.keys(this.getData()).length - 3,
        };
        this.nextButtonClick = this.nextButtonClick.bind(this);
        this.previousButtonClick = this.previousButtonClick.bind(this);
    }

    getData(): {} {
        return {
            "1": {
                "submission1": {
                    "file": "./src/test1/Sample1.js",
                    "lines": [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17
                    ]
                },
                "submission2": {
                    "file": "./src/test2/Sample4.js",
                    "lines": [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17
                    ]
                }
            },
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
                    "lines": [
                        11,
                        12
                    ]
                }
            },
            "3": {
                "submission1": {
                    "file": "./src/test1/Sample2.js",
                    "lines": [
                        3,
                        4,
                        5
                    ]
                },
                "submission2": {
                    "file": "./src/test2/Sample4.js",
                    "lines": [
                        6,
                        7,
                        8
                    ]
                }
            },
            "submission1": {
                "./src/test1/Sample1.js": "function binarySearch(myArray, value){\r\n    let left = 0;\r\n    let right = myArray.length - 1;\r\n    let middle = parseInt((myArray.length - 1)/2)\r\n    while (left <= right) {\r\n        if (myArray[middle] === value) {\r\n            return middle;\r\n        } else if (myArray[middle] < value) {\r\n            left = middle + 1;\r\n            middle = parseInt((left + right)/2);\r\n        } else if (myArray[middle] > value) {\r\n            right = middle - 1;\r\n            middle = parseInt((left + right)/2);\r\n        }\r\n    }\r\n    return -1;\r\n}\r\nconsole.log(binarySearch([1,2,3,4,5,6,7,16],51))",
                "./src/test1/Sample2.js": "// Naive fibonacci.\r\nfunction fibonacci(n) {\r\n  if (n <= 1) {\r\n      return n;\r\n  } else {\r\n      return fibonacci(n-1) + fibonacci(n-2)\r\n  }\r\n}\r\n// plagiarism in the test case\r\nvar copied1 = fibonacci(50);\r\nconsole.log(copied1);"
            },
            "submission2": {
                "./src/test2/Sample3.js": "// Fibonacci iterative.\r\nfunction fibonacci(n) {\r\n  // memoization array\r\n  let arr = [0,1];\r\n      for (let i = 2; i < n + 1; i++) {\r\n          arr.push(arr[i-2] + arr[i-1])\r\n      }\r\n      return arr[n];\r\n}\r\n// plagiarism in the test case\r\nlet copy1 = fibonacci(50);\r\nconsole.log(copy1);",
                "./src/test2/Sample4.js": "function BinarySearch(myArray, value){\r\n    let l = 0;\r\n    let r = myArray.length - 1;\r\n    let mid = parseInt((myArray.length - 1)/2)\r\n    while (l <= r) {\r\n        if (myArray[mid] === value) {\r\n            return mid;\r\n        } else if (myArray[mid] < value) {\r\n            l = mid + 1;\r\n            mid = parseInt((l + r)/2);\r\n        } else if (myArray[mid] > value) {\r\n            r = mid - 1;\r\n            mid = parseInt((l + r)/2);\r\n        }\r\n    }\r\n    return -1;\r\n}\r\nconsole.log(BinarySearch([4,5,6,7,7,8,9],10))"
            },
            "score": 75.86206896551724
        }
    }

    componentDidMount() {
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
        if (index == plagiarism_count - 1) {
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
        if (index == plagiarism_count) {
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
                    <Button
                        variant='primary'
                        className='plagiarism-buttons'
                    >
                        <a href="http://localhost:3000/home">
                            Go Back</a>
                    </Button>
                </Col>
            </div>
        )
    }
}

export default CodeCompare;
