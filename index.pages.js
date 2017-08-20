import { StackNavigator } from "react-navigation"; 
 import {connect} from "react-redux"
import   Home from './src/Home'; 

 export function registerScreens(store, Provider) {  return StackNavigator({  
 Home: {  screen: connect()(Home),  navigationOptions: {   header: null  } }, 
 
});
} 