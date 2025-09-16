// components/ErrorBoundary.tsx
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: string;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { 
      hasError: true, 
      error,
      errorInfo: error.message.includes('fontWeight') ? 'font' : 'general'
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Resume generation error:', error, errorInfo);
    
    // Log specific error types for debugging
    if (error.message.includes('fontWeight')) {
      console.error('Font loading error - check font registration');
    }
    if (error.message.includes('Image')) {
      console.error('Image loading error - check image path and accessibility');
    }
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      
      if (FallbackComponent && this.state.error) {
        return <FallbackComponent error={this.state.error} />;
      }

      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-red-800 dark:text-red-300 font-medium text-lg">Resume Generation Error</h3>
          </div>
          
          <div className="space-y-3 mb-4">
            <p className="text-red-600 dark:text-red-400 text-sm">
              {this.state.errorInfo === 'font' 
                ? 'Font loading issue detected. This may be due to network connectivity or font file accessibility.'
                : 'There was an error generating the resume. This could be due to network issues or browser compatibility.'}
            </p>
            
            {this.state.error && (
              <details className="text-xs text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded">
                <summary className="cursor-pointer font-medium">Technical Details</summary>
                <pre className="mt-2 whitespace-pre-wrap">{this.state.error.message}</pre>
              </details>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors duration-200"
            >
              Reload Page
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
            <p className="text-blue-700 dark:text-blue-300 text-xs">
              <strong>Tip:</strong> If the error persists, try using a different browser or clearing your browser cache. The resume generation works best in Chrome, Firefox, or Safari.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
