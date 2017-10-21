import React from "react";
import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducer";
import * as actions from "./redux/actions";
import RegisterScreens from "./index.pages.js";
import { Query, Model, Cloud } from "./infra";
import { View, Navigator, File, ImageUpload, Modal } from "react-1app";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

var store = createStore(reducers);
actions.setStore(store);

function mapStateToProps(state) {
  return {
    screenProps: {
      store: store,
      actions: actions,
      navigator: state.navigator,
      dispatch: store.dispatch
    },
    navigator: state.navigator,
    navigation:state.navigator,
    data: state
  };
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Model.setHost(Cloud.getHost());
    Query.setHost(Cloud.getHost());
    ImageUpload.setHost(Cloud.getHost());
    // File.setHost(Cloud.getHost());

    Model.setToken(Cloud.getToken());
    Query.setToken(Cloud.getToken());
    ImageUpload.setToken(Cloud.getToken());
    // File.setToken(Cloud.setToken());
    //Modal.setCloseButton(false);
  }
  componentDidMount() {
    actions.init();
  }

  render() {
    return (
      <MuiThemeProvider>
        <View style={{ paddingTop: 0, flex: 1 }}>
          <RegisterScreens
            ref={v => (this.registerScreens = v)}
            store={store}
            actions={actions}
            mapStateToProps={mapStateToProps}
          />
        </View>
      </MuiThemeProvider>
    );
  }
}
