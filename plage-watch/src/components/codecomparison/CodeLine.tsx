import React, { ReactElement } from 'react';
import { Color } from '../../customTypes/CommonTypes';

const lightred: Color = '#FFCCCB';

interface LineProps {
    isPlagiarized: boolean;
    line: string;
    lineNo: number
}

function CodeLine(props: LineProps): ReactElement {
    let color: Color = 'inherit';
    if (props.isPlagiarized) {
        color = lightred;
    }
    return (
        <div
            className='d-flex'
            style={{ backgroundColor: color, minWidth: "fit-content" }}
        >
            <div className='mr-3'>{props.lineNo}.</div>
            <div className='code-lines'>{props.line}</div>
        </div>
    );
}

export default CodeLine;
