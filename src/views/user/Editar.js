import React, { Component } from "react";

import {
  TouchableOpacity,
  Content,
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet
} from "react-1app";
import * as actions from "../../redux/actions";
import * as member from "../../redux/worker/member";

export default class Editar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, user: props.user };
    this.id = 0;
  }

  salvar() {
    var data = this.state.user;
    if (!data.email) return Alert.alert("Erro", "Sem email");
    if (data.id) {
      member.alterar(data, (data, error) => {
        this.props.activity.setState({ editar: false });
      });
    } else {
      member.criar(data, (data, error) => {
        this.props.activity.setState({ editar: false });
      });
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.content} container spacing={24}>
        <View style={styles.view2} />
        <View style={styles.view3}>
          <TextInput
            style={styles.textinput}
            value={this.state.user.name}
            onChange={value => {
              console.log(value);
              this.state.user.name = value;
              this.setState({ user: this.state.user });
            }}
            keyboardType={"default"}
            label={"Nome"}
          />
          <TextInput
            style={styles.textinput1}
            value={this.state.user.password}
            onChange={value => {
              console.log(value);
              this.state.user.password = value;
              this.setState({ user: this.state.user });
            }}
            keyboardType={"default"}
            label={"Senha"}
          />
          <TextInput
            style={styles.textinput2}
            value={this.state.user.email}
            onChange={value => {
              console.log(value);
              this.state.user.email = value;
              this.setState({ user: this.state.user });
            }}
            keyboardType={"default"}
            label={"Email"}
          />
        </View>
        <View style={styles.view4}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.salvar();
            }}
          >
            <Text style={styles.text}>{"SALVAR"}</Text>
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
    flexDirection: "column",
    padding: 50,
    minWidth: 300
  },
  view2: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  view3: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  textinput: {
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    textAlign: "left",
    fontWeight: "normal"
  },
  textinput1: {
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
  view4: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  button: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flexDirection: "column",
    marginTop: 10
  },
  text: {
    textAlign: "center",
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    fontWeight: "normal"
  }
});
