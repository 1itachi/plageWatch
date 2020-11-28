import React from 'react';
import CodeLine from './CodeLine';

function CodePage(props: any) {
    const LineOfCode = props.code.split(/\n/g).map((line: string, index: number) => {
        let isPlagiarized: boolean = false;
        if (props.plagiarized_code_lines.includes(index + 1)) {
            isPlagiarized = true;
        }
        return (
            <CodeLine
                line={line}
                key={index}
                isPlagiarized={isPlagiarized}
                lineNo={index + 1}
            />
        )
    }
    )
    return (
        <>
            <fieldset className='code-area'>
                <legend>{props.filename}</legend>
                <div className='ml-0 overflow-auto code'>
                    {LineOfCode}
                </div>
            </fieldset>
            <div className='container-fluid similarity-portion-count mb-3'>
                Plagiarized Code Lines: {props.plagiarized_code_lines.length}/{props.code.split(/\n/g).length}
            </div>
        </>
    );

}

export default CodePage;