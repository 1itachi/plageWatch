import React, { Component } from 'react';
import PropTypes, {InferType, Requireable, Validator} from 'prop-types';

export default class ErrorBoundary extends Component<any, any> {
    state = {
        error: '',
        errorInfo: '',
        hasError: false,
    };
    static propTypes: { children: Validator<NonNullable<NonNullable<InferType<Requireable<object> | Requireable<any[]>>>>> };
    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }
    componentDidCatch(error: any, errorInfo: any) {
        // eslint-disable-next-line no-console
        this.setState({ errorInfo });
    }
    render() {
        // next code block goes here
        const { hasError, errorInfo } = this.state;
        if (hasError) {
            return (
                <div className="card my-5">
                <div className="card-header">
                    <p>
                        There was an error in loading this page.{' '}
            <span
                style={{ cursor: 'pointer', color: '#C13C37' }}
            onClick={() => {
                window.location.reload();
            }}
        >
            Reload this page
            </span>{' '}
            </p>
            </div>
            <div className="card-body">
            <details className="error-details">
                <summary>Click for error details</summary>
            {errorInfo && errorInfo.toString()}
            </details>
            </div>
            </div>
        );
        }

        return this.props.children;
    }
}
ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
};