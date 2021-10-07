import React from 'react';

export default class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commandLine: [],
      env: {}
    };
  }

  loadState() {
    fetch(this.props.apiPath)
    .then(response => response.json())
    .then(response => this.setState(response));
  }

  componentDidMount() {
    this.loadState()
  }


  render () {
    return (
      <div>
        <div><b>Server Cluster:</b> {this.state.env["CLUSTER_NAME"]}</div>
        <div><b>Server Node:</b> {this.state.env["NODE_NAME"]}</div>
        <div><b>Client Address:</b> <samp>{this.props.page.requestAddr}</samp></div>
        <div><b>Request:</b></div>
        <pre>
          {this.props.page.requestDump}
        </pre>
      </div>
    )
  }
}
