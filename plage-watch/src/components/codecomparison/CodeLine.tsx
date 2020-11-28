import React from 'react';

const lightred: string = '#FFCCCB';

function CodeLine(props: any) {
    let color: string = 'inherit';
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
