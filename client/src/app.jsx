import React from 'react';
import Request from './request';
import { Location, Locations } from 'react-router-component';

function createElement(Component, props) {
  console.log(props)
  return <Component {...props}/>
}

export default class App extends React.Component {
  getChildContext() {
    return {
      reportConnError: () => {}
    }
  }

  handleNavigation() {
    this.forceUpdate()
  }

  render () {
    let addrs = [];
    for (let a of this.props.page.addrs) {
      addrs.push(<span key={a}>{a}</span>, " ")
    }

    let base = this.props.page.urlBase;

    return (
      <div className="top">
        <div className="title">
          <h1><img src="/static/images/logo-org.png" style={{height: "48px"}}/></h1>
          <h2>EPIC Echoserver</h2>
          <div><b>Server:</b> {this.props.page.hostname}</div>
        </div>

        <div className="nav-container">
          <div className="content">
            <Locations>
              <Location path={base+"/"} apiPath={base+"/env/api"} handler={Request} page={this.props.page}/>
            </Locations>
          </div>
          <div><b>Demo application version:</b> <i>{this.props.page.version}</i></div>
          <div><b>Serving on:</b> {addrs}</div>
        </div>
      </div>
    )
  }
}

App.childContextTypes = {
  reportConnError: React.PropTypes.func
}

