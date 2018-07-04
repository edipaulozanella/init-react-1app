import React, { Component } from "react";

import { TouchableOpacity, Content, View, Icon, StyleSheet } from "react-1app";
import {
  Drawer,
  Card,
  CardHeader,
  IconButton,
  MenuIcon,
  List,
  Divider,
  Button
} from "@material-ui/core";
import * as actions from "../../redux/actions";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  componentDidMount() {}

  componentWillUnmount() {}
  sair() {
    this.props.screenProps.store.dispatch(actions.logout());
  }

  openPageButton() {
    console.log(this);
    console.log(this.props.screenProps.history);
    this.props.screenProps.history.push("/login");
    // this.props.navigation.navigate("login", {
    //   activity: this,
    //   oldState: this.state
    // });
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.view3} />
        <View style={styles.view4}>
          <TouchableOpacity to={"/user"} style={styles.button}>
            <Icon
              style={styles.icon}
              fromFontFamily={"Material Design Icons"}
              name={"account-circle"}
            />
          </TouchableOpacity>
          <TouchableOpacity to={"/"} style={styles.button}>
            <Icon
              style={styles.icon}
              fromFontFamily={"Material Design Icons"}
              name={"view-dashboard"}
            />
          </TouchableOpacity>
          <TouchableOpacity to={"/notification"} style={styles.button2}>
            <Icon
              style={styles.icon2}
              fromFontFamily={"Material Design Icons"}
              name={"bell-ring"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.sair();
            }}
            style={styles.button2}
          >
            <Icon
              style={styles.icon2}
              fromFontFamily={"Material Design Icons"}
              name={"login-variant"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  content: {
    backgroundColor: null,
    alignSelf: "stretch",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  view3: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  view4: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row-reverse"
  },
  button: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flexDirection: "column",
    width: 50
  },
  icon: {
    color: "rgba(119,119,119,1)",
    fontSize: 25
  },
  button2: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flexDirection: "column",
    width: 50
  },
  icon2: {
    color: "rgba(119,119,119,1)",
    fontSize: 20
  }
});
