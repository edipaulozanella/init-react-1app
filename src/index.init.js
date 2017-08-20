import React from 'react'
import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducer";
import * as actions from "./redux/actions";
import  RegisterScreens  from "./index.pages.js";
import {Query, Model,Cloud} from './infra';

var store = createStore(reducers);
console.log(require('./infra'))
function mapStateToProps(state) {
  return {
    actions:actions,
    store:store,
    data: state
  };
  
  Model.setHost(Cloud.getHost());
  Query.setHost(Cloud.getHost());
    
  Model.setToken(Cloud.getToken());
  Query.setToken(Cloud.getToken());
     
}
 
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
  }
  componentDidMount() {
  }
 
  render() {
    return (
        <RegisterScreens store={store} mapStateToProps={mapStateToProps}   />
    );
  }
}
