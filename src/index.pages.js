import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { connect, Provider } from "react-redux";
import { StyleSheet, Navigator } from 'react-1app';
import Home from "./views/Home";

export default class Navegation extends React.Component {
    componentDidMount() {
    this.navigator.history = this.router.history;
  }
  render() {
    return (
      <Provider ref={"pro"} store={this.props.store}>
        <Router ref={v => (this.router = v)}>

            <Navigator
              ref={v => (this.navigator = v)}
                         actions={this.props.actions}
                         store={this.props.store}
                         style={{ flex: 1 }}
          >
            <Route
              exact
              path="/"
              component={withRouter(connect(this.props.mapStateToProps)(Home))}
            />
          </Navigator>
        </Router>
      </Provider>
    );
  }
}
