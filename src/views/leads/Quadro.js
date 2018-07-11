import React, { Component } from "react";

import { Content, View, Fragment, StyleSheet } from "react-1app";
import { Util } from "../../infra";
import {
  Drawer,
  IconButton,
  MenuIcon,
  List,
  Divider,
  Button
} from "@material-ui/core";
import * as actions from "../../redux/actions";
import * as login from "../../redux/worker/login";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import classNames from "classnames";
import Store from "@material-ui/icons/Store";
import {
  CardHeader,
  CardIcon,
  CardFooter,
  Card,
  CardContent
} from "react-1app-dashboard";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.content} item={true}>
        <Fragment
          style={styles.fragment}
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          activity={this}
        />
        <Fragment
          style={styles.fragment2}
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          activity={this}
        />
        <Fragment
          style={styles.fragment3}
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
    backgroundColor: "rgba(238,238,238,1)",
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: 20
  },
  fragment: {
    alignSelf: "stretch",
    flex: 1
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
