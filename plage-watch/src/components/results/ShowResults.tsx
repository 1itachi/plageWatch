// Function call class to display the results.
import React, { useState } from 'react';
import Results from './../results/Results';

export default function ShowResults() {
    const [results, onResults] = useState(false);

    return (
        <div className="container center">
            <button onClick={() => onResults(!results)} />
            {/* Add a progress bar here */}
            {results ? (
                <Results />
            ) : null}
        </div>
    )
}
