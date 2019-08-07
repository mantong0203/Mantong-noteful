import React from 'react';

class FolderErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return(
        <h2> Oops!  There has been an error!  Could not display any folders</h2>
      );
    }
    return this.props.children;
  }
}

export default FolderErrorBoundary;