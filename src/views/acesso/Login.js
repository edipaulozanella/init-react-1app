import React, { Component } from "react";

import {
  TouchableOpacity,
  Content,
  View,
  Progress,
  Text,
  TextInput,
  StyleSheet
} from "react-1app";
import { Util } from "../../infra";
import { Button, CardActions, InputAdornment } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Store from "@material-ui/icons/Store";
import {
  CardHeader,
  CardIcon,
  CardFooter,
  Card,
  CardContent
} from "react-1app-dashboard";
import { Redirect } from "react-router-dom";
import * as actions from "../../redux/actions";
import * as login from "../../redux/worker/login";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "edipaulo@gmail.com", password: "edi" };
  }

  logar() {
    var email = this.state.email;
    var password = this.state.password;
    console.log(email, password);
    if (!email) return alert("email inválido");
    if (!password) return alert("Senha inválida");
    this.setState({ load: true });
    login.login(email, password, (user, error) => {
      if (error) {
        this.setState({ load: false });
      } else {
        this.entrar(user);
      }
    });
  }

  entrar(user) {
    this.props.screenProps.store.dispatch(
      actions.logar(user, this.props.screenProps.store)
    );
  }

  redirecionar() {
    var from =
      this.props.location && this.props.location.state
        ? this.props.location.state.from
        : null;
    if (!from || from.pathname == "/login") {
      from = { pathname: "/" };
    }
    if (this.props.screenProps.store.getState().user) {
      //   console.log(from);
      return <Redirect to={from} />;
    }
  }

  componentDidMount() {
    login.loadUser(user => {
      if (!user) {
        this.setState({ load: false });
      } else {
        this.entrar(user);
      }
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.content}>
        {this.redirecionar()}

        {!this.state.load ? (
          <Card style={styles.fragment1}>
            <CardHeader style={styles.fragment2} color={"success"}>
              <Text style={styles.text1}>{"ACESSO PAINEL"}</Text>
            </CardHeader>
            <View style={styles.view2}>
              <TextInput
                style={styles.textinput}
                value={this.state.email}
                onChange={value => {
                  this.state.email = value;
                  this.setState({ item: this.state.item });
                }}
                keyboardType={"default"}
                label={"Login"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
              <TextInput
                style={styles.textinput2}
                value={this.state.password}
                onChange={value => {
                  this.state.password = value;
                  this.setState({ item: this.state.item });
                }}
                keyboardType={"default"}
                label={"Senha"}
                onSubmitEditing={() => {
                  this.logar();
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.logar();
                }}
              >
                <Text style={styles.text}>{"ENTRAR"}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ) : null}

        {this.state.load ? <Progress style={styles.progress} /> : null}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  content: {
    backgroundColor: "rgba(238,238,238,1)",
    alignSelf: "stretch",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  fragment1: {
    alignSelf: "auto",
    width: 300
  },
  fragment2: {
    alignSelf: "auto"
  },
  text1: {
    textAlign: "center",
    color: "rgba(255,255,255,1)",
    alignSelf: "stretch",
    fontWeight: "normal"
  },
  view2: {
    alignSelf: "auto",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,1)",
    padding: 30
  },
  textinput: {
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    textAlign: "left",
    fontWeight: "normal"
  },
  textinput2: {
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    textAlign: "left",
    fontWeight: "normal"
  },
  button: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flexDirection: "column"
  },
  text: {
    textAlign: "center",
    color: "rgba(139,139,139,1)",
    alignSelf: "stretch",
    fontWeight: "normal"
  },
  progress: {
    width: 35,
    height: 35
  }
});
