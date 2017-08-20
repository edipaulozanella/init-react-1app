'use strict';
import React, { Component } from 'react';
import styleGlobal from '../styleGlobal';
import { StyleSheet, Navigator, View, } from 'react-1app';

export default class Page extends Component {
  constructor(props){
    super(props);
    this.state = {};
    Navigator.cloneState(this);
  //this.onConstructor(props,this.state)
  }


  //START CODE

  //END CODE





  render(){
    return (


      <View style={ styles.content }/>

      );
  }
}



var styles = StyleSheet.create(
  {
    "content": {
      "backgroundColor": "rgba(255,255,255,1)",
      "alignSelf": "stretch",
      "flex": 1,
      "alignItems": "flex-start",
      "justifyContent": "flex-start",
      "flexDirection": "column"
    }
  }
);

