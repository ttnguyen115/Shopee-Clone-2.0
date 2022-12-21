import React from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error: ', error, errorInfo)
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <main className='flex h-screen w-full flex-col items-center justify-center'>
          <h1 className='text-9xl font-extrabold tracking-widest text-gray-900'>500</h1>
          <div className='absolute rotate-12 rounded bg-orange px-2 text-sm text-white'>Something went wrong!</div>
          <button className='mt-5'>
            <a
              href='/'
              className='active:text-orange-500 group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring'
            >
              <span className='absolute inset-0 translate-x-0.5 translate-y-0.5 bg-orange transition-transform group-hover:translate-y-0 group-hover:translate-x-0' />
              <span className='relative block border border-current px-8 py-3'>
                <span>Go Home</span>
              </span>
            </a>
          </button>
        </main>
      )
    }
    return this.props.children
  }
}
