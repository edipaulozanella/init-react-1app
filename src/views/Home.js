import React, { Component } from "react";

import { Content, View, StyleSheet } from "react-1app";
import DashHeader from "./dash/Header.js";
import DashPainel from "./dash/Painel.js";
import DashMenu from "./dash/Menu.js";
import AcessoLogin from "./acesso/Login.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.unsubscribe = this.props.screenProps.store.subscribe(() => {
      var store = this.props.screenProps.store.getState();
      if (store.user != this.state.user) this.setState({ user: store.user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.content}>
        <DashPainel
          style={styles.fragment2}
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          activity={this}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  content: {
    backgroundColor: "#eee",
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  fragment: {
    alignSelf: "stretch",
    flex: 1
  },
  view2: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  fragment2: {
    alignSelf: "stretch",
    flex: 1
  },
  fragment3: {
    alignSelf: "stretch",
    flex: 1
  }
});
