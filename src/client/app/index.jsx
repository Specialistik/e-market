import React from 'react';
import {render} from 'react-dom';
//import App from header

class Header extends React.Component {
  render() {
      return (
          <div className="logo">
              <a href="/">
                  <img src="/static/images/small-logo.png" alt=""/>
              </a>
          </div>
      );
  }
}


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          user: {
              role: 'filthy, helpless slut',
              is_authenticated: false,
          }
      };
  }

  render() {
    return 
      <header id="header" className="header_wrapp clearfix">
          <div className="header_inner claerfix">
              <div className="logo">
                  <a href="/">
                      <img src="/static/images/small-logo.png" alt=""/>
                  </a>
              </div>
          </div>
      </header>
  }
}

render(<App/>, document.getElementById('app'));