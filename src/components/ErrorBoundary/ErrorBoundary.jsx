import React from "react";

import './ErrorBoundary.css';

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundary">
					<div className="error-boundary__container">
						<h1 className="error-boundary__title">Sorry... Something went wrong.</h1>
					</div>
				</div>
			)
		}

		return this.props.children;
	}
}