import React, { Component } from "react";

import { Content, View, Text, StyleSheet } from "react-1app";
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
        <View container spacing={24}>
          <View style={styles.view3} item={true} md={6}>
            <Card style={styles.fragment1}>
              <CardHeader style={styles.fragment2} color={"success"}>
                <Text style={styles.text1}>{"ACESSO PAINEL"}</Text>
              </CardHeader>
              <View style={styles.view2} />
            </Card>
          </View>
          <View style={styles.view3} item={true} md={6}>
            <Card style={styles.fragment1}>
              <CardHeader style={styles.fragment2} color={"success"}>
                <Text style={styles.text1}>{"ACESSO PAINEL"}</Text>
              </CardHeader>
              <View style={styles.view2} />
            </Card>
          </View>

          <Grid item xs={12}>
            <Paper>xs=12</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
        </View>
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
  fragment1: {},
  fragment2: {},
  text1: {},
  view2: {},
  view3: {},
  view5: {
    alignSelf: "stretch",
    flex: 1
  },
  view4: {
    alignSelf: "stretch",
    flex: 1
  }
});
