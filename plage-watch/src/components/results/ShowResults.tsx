// Function call class to display the results.

// Source (for progress bar):
// https://onsen.io/v2/api/react/ProgressBar.html

import React, { useState } from 'react';
import Results from './../results/Results';
import CircularProgressBar from './../results/Results';

export default function ShowResults() {
    const [results, onResults] = useState(false);

    return (
        <div className="container center">
            <button onClick={() => onResults(!results)} />
            {/* Add a progress bar here */}
            <CircularProgressBar />
            {results ? (
                <Results />
            ) : null}
        </div>
    )
}
