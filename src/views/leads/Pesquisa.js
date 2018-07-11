import React, { Component } from "react";

import {
  TouchableOpacity,
  Content,
  View,
  Icon,
  ListView,
  Modal,
  Navigator,
  Progress,
  RefreshControl,
  Switch,
  Text,
  TextInput,
  StyleSheet
} from "react-1app";
import { Query } from "../infra";

import ApiApp from "./api/apiApp";
 
import LeadImport from "./LeadImport";
import AddEmail from "./AddEmail";
import LeadsEditar from "./LeadsEditar";

export default class LeadsEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: new Dados("tags"),
      itens_tags: [],
      load_tags: true,
      leads: new Dados("leads"),
      itens_leads: [],
      load_leads: true
    };
    Navigator.cloneState(this);
    this.onConstructor(props, this.state);
  }

  onConstructor() {
    this.state.dados = {};
  }

  salvarServer(contatos) {
    this.state.navigator.openModal({
      pageName: "LeadImport",
      component: LeadImport,
      props: {
        lista: contatos,
        heranca: this.state,
        activity: this
      }
    });
  }

  convert(csvString) {
    if (!csvString) {
      return {};
    }
    let json = [];
    let csvArray = csvString.split("\n");
    if (csvArray.length <= 1) {
      return {};
    }
    let csvColumns = JSON.parse(
      "[" + csvArray.shift().replace(/'/g, '"') + "]"
    );
    csvArray.forEach(function(csvRowString) {
      let csvRow = csvRowString.split(",");
      if (csvRowString) {
        let jsonRow = new Object();
        for (var colNum = 0; colNum < csvRow.length; colNum++) {
          let colData = csvRow[colNum].replace(/^['"]|['"]$/g, "");
          jsonRow[csvColumns[colNum]] = colData.trim();
        }
        json.push(jsonRow);
      }
    });
    return json;
  }

  upLoadFile(callback) {
    var file = document.createElement("INPUT");
    file.setAttribute("type", "file");
    file.style.visibility = "hidden";
    document.body.appendChild(file);
    file.click();
    file.addEventListener(
      "change",
      event => {
        var files = file.files;
        if (files && files[0]) {
          // this.upFile(files[0]);
          var reader = new FileReader();
          reader.onload = function() {
            var text = reader.result;
            // console.log(text);
            callback(text);
          };
          reader.readAsText(files[0]);
        }
      },
      false
    );
  }

  uploadCsv() {
    this.upLoadFile(csvStr => {
      // console.log(this.convert(csvStr));
      var array = this.convert(csvStr);
      var lista = [];
      for (var i = 0; i < array.length; i++) {
        let item = array[i];
        if (item) {
          var add = {};
          var sub = Object.keys(item);
          var addContato = false;
          for (var a = 0; a < sub.length; a++) {
            var name = sub[a].toLowerCase();
            if (name == "name") {
              var tag = item[sub[a]];
              if (tag && !ApiUteis.contemString(tag, "name")) {
                tag = ApiUteis.replaceAll(tag, "'", "");
                tag = ApiUteis.replaceAll(tag, '"', "");
                tag = tag.split(";")[0];
                tag = tag.split(",")[0];
                add.nome = tag;
              }
            } else if (name == "email" || name == "e-mail") {
              var tag = item[sub[a]];
              if (tag && ApiUteis.contemString(tag, "@")) {
                tag = ApiUteis.replaceAll(tag, "'", "");
                tag = ApiUteis.replaceAll(tag, '"', "");
                tag = tag.split(";")[0];
                tag = tag.split(",")[0];
                add.email = tag;
                addContato = true;
              }
            }
          }
          if (addContato) {
            lista.push(add);
          }
        }
      }
      this.salvarServer(lista);
      // console.log(lista);
    });
  }

  get_data_leads() {
    var tags = [];
    var sub = Object.keys(this.state.dados);
    for (var a = 0; a < sub.length; a++) {
      var tag = this.state.dados[sub[a]];
      if (tag && tag.objectId) {
        tags.push(parseInt(tag.objectId));
      }
    }
    var query = new Query("leads");
    query.whereEqualTo("key_user", this.state.user_local.objectId);
    query.whereEqualTo("pesquisa", this.state.pesquisa);
    query.whereEqualTo("tags", JSON.stringify(tags));
    query.setMetodoApi("filroLeads", "POST");
    query.setLimit(10);
    query.firstCloud(data => {
      if (data) {
        var lista = [];
        for (var i = 0; i < data.lista.length; i++) {
          var item = data.lista[i];
          lista.push(new Dados("leads").parse(item));
        }
        this.setState({
          load: false,
          totalAtivos: data.total,
          itens_leads: lista,
          load_leads: false
        });
      }
    });
  }

  filtrar(cell) {
    if (this.state.dados[cell.state.tags.objectId]) {
      this.state.dados[cell.state.tags.objectId] = null;
    } else {
      this.state.dados = {};
      this.state.dados[cell.state.tags.objectId] = cell.state.tags;
    }
    this.setState({
      pesquisa: "",
      dados: this.state.dados,
      load_leads: true,
      load_leadscampanha: true
    });
    this.componentDidMount();
  }

  pesquisar() {
    this.setState({
      dados: {},
      load_leads: true,
      load_leadscampanha: true,
      load: true
    });
    this.componentDidMount();
  }

  get_data_tags() {
    var query = new Query("tags");
    query.setLimit(1000);
    query.cloud(lista => {
      this.setState({
        itens_tags: lista,
        load_tags: false
      });
    });
  }

  open_modal_new_bottom() {
    this.state.navigator.openModal({
      pageName: "AddEmail",
      component: AddEmail,
      props: {
        heranca: this.state,
        leads: new Dados("leads"),
        activity: this
      }
    });
  }

  componentDidMount() {
    this.get_data_tags();
    this.get_data_leads();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      this.get_data_tags();

      this.get_data_leads();

      //{onUpdate}
    }
    return true;
  }

  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.tela}>
        <View style={styles.view20}>
          <View style={styles.view21}>
            <View style={styles.view26}>
              <View style={styles.view31}>
                <View style={styles.view32}>
                  <TouchableOpacity
                    style={styles.bottom4}
                    onPress={() => {
                      this.pesquisar();
                    }}
                    disabled={this.state.load}
                  >
                    {!this.state.load ? (
                      <Icon
                        style={styles.icon8}
                        fromFontFamily={"Material Icons"}
                        name={"search"}
                      />
                    ) : null}

                    {this.state.load ? (
                      <View style={styles.view33}>
                        <Progresso style={styles.progresso1} />
                      </View>
                    ) : null}
                  </TouchableOpacity>
                  <TextInput
                    style={styles.textinput1}
                    value={this.state.pesquisa}
                    onChange={value => {
                      this.state.pesquisa = value;
                      this.setState({
                        item: this.state.item
                      });
                    }}
                    onSubmitEditing={() => {
                      this.pesquisar();
                    }}
                    keyboardType={"default"}
                    secureTextEntry={false}
                    multiline={false}
                    label={"Pesquisar por nome/email"}
                    ref={v => (this.textinput1 = v)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.view28}>
              <ListView
                style={styles.tags}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.load_tags}
                    onRefresh={() => {
                      this.setState({ load_tags: true });
                      this.get_data_tags();
                    }}
                  />
                }
                dataSource={this.state.itens_tags}
                renderRow={(rowData, sectionID, rowID) => {
                  return (
                    <Cell3
                      tags={rowData}
                      heranca={this.state}
                      activity={this}
                      navigator={this.state.navigator}
                      rowID={rowID}
                      sectionID={sectionID}
                    />
                  );
                }}
                colorSeparator={"rgba(227,227,227,1)"}
                ref={v => (this.tags = v)}
              />
            </View>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.view1}>
            <Icon
              style={styles.icon7}
              fromFontFamily={"Material Design Icons"}
              name={"email-variant"}
            />
            <Text style={styles.label}>{"Leads"}</Text>
            <Text style={styles.label5}>{this.state.totalAtivos}</Text>
            <View style={styles.view8}>
              <TouchableOpacity
                style={styles.bottom}
                onPress={() => {
                  this.open_modal_new_bottom();
                }}
              >
                <Icon
                  style={styles.icon5}
                  fromFontFamily={"Material Icons"}
                  name={"add"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottom1}
                onPress={() => {
                  this.uploadCsv();
                }}
              >
                <Icon
                  style={styles.icon3}
                  fromFontFamily={"Material Design Icons"}
                  name={"cloud-upload"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ListView
            style={styles.leads}
            refreshControl={
              <RefreshControl
                refreshing={this.state.load_leads}
                onRefresh={() => {
                  this.setState({ load_leads: true });
                  this.get_data_leads();
                }}
              />
            }
            dataSource={this.state.itens_leads}
            renderRow={(rowData, sectionID, rowID) => {
              return (
                <Cell
                  leads={rowData}
                  heranca={this.state}
                  activity={this}
                  navigator={this.state.navigator}
                  rowID={rowID}
                  sectionID={sectionID}
                />
              );
            }}
            colorSeparator={"rgba(227,227,227,1)"}
            ref={v => (this.leads = v)}
          />
        </View>
      </View>
    );
  }
}

class Cell3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: new Dados("tags"),
      this: new Dados("this")
    };
    Dados.clonarHeranca(props, this.state);
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      Dados.clonarHeranca(nextProps, nextState);
    }
    return true;
  }

  componentWillUnmount() {}

  render() {
    return (
      <TouchableOpacity style={styles.cell3} disabled={true}>
        <View style={styles.view24}>
          <View style={styles.view25}>
            <Text style={styles.label13}>{this.state.tags.nome}</Text>
          </View>
          <Switch
            style={styles.switch1}
            value={this.state.dados[this.state.tags.objectId]}
            onChange={value => {
              this.props.activity.filtrar(this);
            }}
            ref={v => (this.switch1 = v)}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leads: new Dados("leads")
    };
    Dados.clonarHeranca(props, this.state);
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      Dados.clonarHeranca(nextProps, nextState);
    }
    return true;
  }

  open_pg_dinamico_cell(item) {
    this.state.navigator.push({
      pageName: "LeadsEditar",
      component: LeadsEditar,
      props: {
        heranca: this.state,
        activity: this.props.activity
      }
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => {
          this.open_pg_dinamico_cell(this.state);
        }}
      >
        <View style={styles.view2}>
          <View style={styles.view3} />
          <View style={styles.view4}>
            <Text style={styles.email}>{this.state.leads.email}</Text>
            <Text style={styles.createdAt}>
              {moment(this.state.leads.createdAt)
                .locale("pt-br")
                .fromNow()}
            </Text>
          </View>
          <View style={styles.view9}>
            <Icon
              style={styles.icon2}
              fromFontFamily={"Material Design Icons"}
              name={"account"}
            />
            <Text style={styles.label4}>{this.state.leads.nome}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  tela: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    padding: 5
  },
  view20: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    paddingRight: 10,
    width: 300
  },
  view21: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    backgroundColor: "rgba(238,238,238,1)"
  },
  view26: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    borderRadius: 5,
    backgroundColor: "rgba(238,238,238,1)",
    padding: 5
  },
  view31: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    padding: 5
  },
  view32: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap"
  },
  bottom4: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
    width: 45
  },
  icon8: {
    color: "rgba(150,150,145,1)",
    fontSize: 25
  },
  view33: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap"
  },
  progresso1: {
    width: 35,
    height: 35
  },
  textinput1: {
    minHeight: 35,
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    textAlign: "left",
    flexWrap: "nowrap",
    flex: 1
  },
  view28: {
    alignSelf: "stretch",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    borderRadius: 5,
    padding: 5
  },
  tags: {
    alignSelf: "stretch"
  },
  cell3: {
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
    padding: 2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap"
  },
  view24: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,1)"
  },
  view25: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "nowrap",
    padding: 5
  },
  label13: {
    textAlign: "left",
    flexWrap: "wrap",
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    fontFamily: "NexaBold"
  },
  switch1: {
    alignSelf: "auto"
  },
  view: {
    alignSelf: "auto",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    borderRadius: 5,
    backgroundColor: "rgba(238,238,238,1)",
    padding: 5,
    flex: 1
  },
  view1: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    padding: 5
  },
  icon7: {
    color: "rgba(69,191,85,1)",
    fontSize: 20
  },
  label: {
    textAlign: "left",
    flexWrap: "wrap",
    color: "rgba(150,150,145,1)",
    alignSelf: "stretch",
    marginLeft: 10,
    fontFamily: "Roboto-Light"
  },
  label5: {
    textAlign: "left",
    flexWrap: "wrap",
    color: "rgba(150,150,145,1)",
    alignSelf: "stretch",
    marginLeft: 10,
    fontFamily: "Roboto-Light"
  },
  view8: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flexWrap: "nowrap"
  },
  bottom: {
    alignSelf: "auto",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    flexDirection: "column",
    flexWrap: "nowrap",
    width: 35
  },
  icon5: {
    color: "rgba(150,150,145,1)",
    fontSize: 25
  },
  bottom1: {
    alignSelf: "auto",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    flexDirection: "column",
    flexWrap: "nowrap",
    width: 35,
    marginRight: 10
  },
  icon3: {
    color: "rgba(150,150,145,1)",
    fontSize: 25
  },
  leads: {
    alignSelf: "stretch"
  },
  cell: {
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
    padding: 2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap"
  },
  view2: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,1)"
  },
  view3: {
    alignSelf: "auto",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    padding: 10
  },
  view4: {
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "nowrap",
    padding: 5
  },
  email: {
    textAlign: "left",
    flexWrap: "wrap",
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    fontFamily: "NexaBold"
  },
  createdAt: {
    textAlign: "left",
    flexWrap: "wrap",
    color: "rgba(150,150,145,1)",
    alignSelf: "stretch",
    fontSize: 12
  },
  view9: {
    alignSelf: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "nowrap",
    flex: 1,
    padding: 10
  },
  icon2: {
    color: "rgba(150,150,145,1)",
    fontSize: 15
  },
  label4: {
    textAlign: "center",
    flexWrap: "wrap",
    color: "rgba(0,0,0,1)",
    alignSelf: "stretch",
    fontSize: 13,
    marginLeft: 5
  }
});
