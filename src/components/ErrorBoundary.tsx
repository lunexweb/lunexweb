import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  
  componentDidCatch(error: any, errorInfo: any) {
    console.error('App crashed:', error, errorInfo)
  }
  
  render() {
    if ((this.state as any).hasError) {
      return (
        <div className="flex items-center justify-center h-screen text-center">
          <div>
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="text-gray-500 mt-2">
              Please refresh or try again later.
            </p>
          </div>
        </div>
      )
    }
    return (this.props as any).children
  }
}
