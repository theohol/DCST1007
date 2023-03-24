import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        Menu: <br />
        <NavLink to="/">Meny</NavLink> <br />
        <NavLink to="/page1">Utdanning</NavLink> <br />
        <NavLink to="/page2">Arbeidserfaring</NavLink> <br />
        <NavLink to="/page3">Interesser</NavLink>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>Hjemmesiden ass</div>;
  }
}

class Utdanning extends Component {
  render() {
    return <div>Utdanning</div>;
  }
}

class Arbeidserfaring extends Component {
  render() {
    return <div>Arbeidserfaring</div>;
  }
}

class Interesser extends Component {
  render() {
    return <div>Fortnite</div>;
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/page1" component={Utdanning} />
      <Route path="/page2" component={Arbeidserfaring} />
      <Route path="/page3" component={Interesser} />
    </div>
  </HashRouter>
);
