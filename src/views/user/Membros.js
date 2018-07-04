import React, { Component } from "react";

import {
  TouchableOpacity,
  Content,
  View,
  Icon,
  ListView,
  Modal,
  RefreshControl,
  Text,
  StyleSheet
} from "react-1app";
import UserEditar from "../user/Editar.js";
import * as actions from "../../redux/actions";
import * as member from "../../redux/worker/member";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { load: true, membros: [] };
    this.id = 0;
  }

  novoUser() {
    this.setState({ user: {}, editar: true });
  }

  editar(user) {
    this.setState({ user, editar: true });
  }

  carregarMembros() {
    member.listar((data, error) => {
      console.log(data);
      if (!error) this.setState({ membros: data, load: false });
    });
  }

  componentDidMount() {
    this.carregarMembros();
  }

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.content} container spacing={24}>
        <ListView
          style={styles.listview}
          refreshControl={
            <RefreshControl
              refreshing={this.state.load}
              onRefresh={() => {
                this.setState({ load: true });
              }}
            />
          }
          dataSource={this.state.membros}
          renderRow={(rowData, sectionID, rowID) => {
            return (
              <Celllistview
                user={rowData}
                screenProps={this.props.screenProps}
                activity={this}
                navigation={this.props.navigation}
                rowID={rowID}
              />
            );
          }}
        />
        <View style={styles.view2}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.novoUser();
            }}
          >
            <Icon
              style={styles.icon}
              fromFontFamily={"Material Design Icons"}
              name={"plus"}
            />
          </TouchableOpacity>
        </View>
        <Modal
          style={styles.modal}
          visible={this.state.editar}
          onRequestClose={() => {
            this.setState({ editar: false });
          }}
          screenProps={this.props.screenProps}
          navigation={this.props.navigation}
          activity={this}
        >
          <UserEditar
            style={styles.fragment}
            user={this.state.user}
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
            activity={this}
          />
        </Modal>
      </View>
    );
  }
}

class Celllistview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  editar() {
    this.props.activity.editar(this.props.user);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => {
          this.editar();
        }}
        screenProps={this.props.screenProps}
        navigation={this.props.navigation}
        activity={this}
      >
        <Text style={styles.text}>{this.props.user.name}</Text>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  content: {
    backgroundColor: null,
    alignSelf: "auto",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    margin: 20
  },
  listview: {
    alignSelf: "stretch",
    flex: 1
  },
  cell: {
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  text: {
    textAlign: "left",
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    fontWeight: "normal"
  },
  view2: {
    alignSelf: "stretch",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    position: "fixed",
    bottom: 15,
    right: 15
  },
  button: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flexDirection: "column",
    width: 50,
    elevation: 5,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,1)"
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30
  },
  modal: {},
  fragment: {
    alignSelf: "stretch",
    flex: 1
  }
});
