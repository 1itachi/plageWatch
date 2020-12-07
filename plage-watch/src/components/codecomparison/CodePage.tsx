import React, { ReactElement } from 'react';
import CodeLine from './CodeLine';

interface CodeProps {
    code: string;
    plagiarized_code_lines: Array<number>;
    filename: string;
}

function CodePage(props: CodeProps): ReactElement {
    const LineOfCode = props.code.split(/\n/g).map((line: string, index: number): ReactElement => {
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
                <legend className='code-area-sub-name'>{props.filename}</legend>
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