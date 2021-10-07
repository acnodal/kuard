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
    let args = [];
    for (let [idx, arg] of this.state.commandLine.entries()) {
      args.push(<code key={idx}>{arg}</code>)
      args.push(" ")
    }

    let rows = [];
    for (let k in this.state.env) {
      rows.push(
        <tr key={k}>
          <td><samp>{k}</samp></td>
          <td><samp>{this.state.env[k]}</samp></td>
        </tr>
      )
    }

    return (
      <div>
        <div><b>Server Cluster:</b> {this.state.env["CLUSTER_NAME"]}</div>
        <div><b>Server Node:</b> {this.state.env["NODE_NAME"]}</div>
        <div><b>Client Address:</b> <samp>{this.props.page.requestAddr}</samp></div>
        <div><b>Request:</b></div>
        <pre>
          {this.props.page.requestDump}
        </pre>
        <div><b>Server Environment:</b></div>
        <table className="table table-condensed table-bordered">
          <thead>
            <tr>
              <th>Key</th><th>Value</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <dl>
          <dt><b>Command Line:</b></dt>
          <dd>{args}</dd>
        </dl>
      </div>
    )
  }
}
