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
          <h1><img src="https://www.acnodal.io/images/logo-org.png" style={{height: "48px"}}/></h1>
          <h2>Echoserver</h2>
        </div>

        <div className="nav-container">
          <div className="content">
            <Locations>
              <Location path={base+"/"} apiPath={base+"/env/api"} handler={Request} page={this.props.page}/>
            </Locations>
          </div>
        </div>
      </div>
    )
  }
}

App.childContextTypes = {
  reportConnError: React.PropTypes.func
}

