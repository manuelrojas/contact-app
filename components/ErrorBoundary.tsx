import { Axios } from 'axios';
import React from 'react';

type Props = {
  axios: Axios;
};

type CustomError = {
  hasError: boolean,
  error: Error
};

class ErrorBoundary extends React.Component<Props, CustomError> {
  constructor(props) {
    super(props);

    this.state = { hasError: false, error: null };
  }

  componentDidMount() {
    // Set axios interceptors
    this.props.axios.interceptors.request.use(req => {
      this.setState({ hasError: false });
      return req;
    });

     this.props.axios.interceptors.response.use(
      res => res,
      error => {
        console.log('Error happened');
        this.setState({ error, hasError: true });
      }
    );
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // This is can be replaced for log service.
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (<div role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Error
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>Something went wrong.</p>
          </div>
        </div>);
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;