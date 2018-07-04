import React from "react";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import { connect, Provider } from "react-redux";
import { StyleSheet, Navigator, View } from "react-1app";
import Home from "./views/Home";
import DashPainel from "./views/dash/Painel.js";
import Membros from "./views/user/Membros.js";
import Login from "./views/acesso/Login";
import DashHeader from "./views/dash/Header.js";
import DashMenu from "./views/dash/Menu.js";
import createBrowserHistory from "history/createBrowserHistory";
var customHistory = createBrowserHistory();

export default class Navegation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.mapStateToProps().screenProps.history = {
      push: page => {
        // console.log(page);
        customHistory.push(page);
        this.setState({ page: page });
      }
    };
  }
  componentDidMount() {}

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => {
      var store = this.props.store.getState();
      if (store.user != this.state.user) this.setState({ user: store.user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    return (
      <Provider ref={"pro"} store={this.props.store}>
        <Router ref={v => (this.router = v)} history={customHistory}>
          <View style={{ flex: 1 }}>
            {this.props.store.getState().user ? (
              <DashMenu
                screenProps={this.props.mapStateToProps().screenProps}
              />
            ) : null}

            <View
              style={{
                alignSelf: "stretch",
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "column"
              }}
            >
              {this.props.store.getState().user ? (
                <DashHeader
                  screenProps={this.props.mapStateToProps().screenProps}
                  history={customHistory}
                />
              ) : null}

              <PrivateRoute
                exact
                path="/"
                user={this.props.store.getState().user}
                store={this.props.store}
                component={withRouter(
                  connect(this.props.mapStateToProps)(Home)
                )}
              />

              <PrivateRoute
                exact
                path="/home"
                user={this.props.store.getState().user}
                store={this.props.store}
                component={withRouter(
                  connect(this.props.mapStateToProps)(Home)
                )}
              />

              <PrivateRoute
                exact
                path="/resale"
                store={this.props.store}
                user={this.props.store.getState().user}
                component={DashPainel}
              />

              <PrivateRoute
                exact
                path="/members"
                store={this.props.store}
                user={this.props.store.getState().user}
                component={Membros}
              />
              <PrivateRoute
                exact
                path="/apis"
                store={this.props.store}
                user={this.props.store.getState().user}
                component={Membros}
              />

              <PrivateRoute
                exact
                path="/team"
                store={this.props.store}
                user={this.props.store.getState().user}
                component={DashPainel}
              />
              <Route
                path="/login"
                exact
                user={this.props.store.getState().user}
                component={withRouter(
                  connect(this.props.mapStateToProps)(Login)
                )}
              />
            </View>
          </View>
        </Router>
      </Provider>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      //   console.log(rest.user);

      if (rest.user) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

// const RouteLogin = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => {
//       //   console.log(props.user);
//       if (!rest.user) {
//         return <Component {...props} />;
//       }
//       return (
//         <Redirect
//           to={{
//             pathname: "/home",
//             state: { from: props.location }
//           }}
//         />
//       );
//     }}
//   />
// );
