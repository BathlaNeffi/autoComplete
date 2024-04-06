// import necessary modules
import React, { Component, ReactNode } from "react";
// Define props interface for ErrorBoundary component
interface ErrorBoundaryProps {
    children: ReactNode;
}
// Define state interface for ErrorBoundary component
interface ErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        // Initialize state with hasError set to false
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        // Set hasError to true when an error occurs
        return {
            hasError: true
        };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        // Log the error and error info to the console
        console.log("Error", error);
        console.log("Error Info:", info);
    }
    // Render method of ErrorBoundary component
    render(): ReactNode {
        // If an error has occurred, render a fallback UI
        if (this.state.hasError) {
            return <h1>Something Went wrong Contact Admin</h1>;
        }
        // If no error, render the children
        return this.props.children;
    }
}
