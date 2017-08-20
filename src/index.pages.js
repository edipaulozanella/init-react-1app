import React from "react";
import { BrowserRouter as Router,  Route,withRouter} from "react-router-dom"; 
import {connect,Provider} from "react-redux"
import   Home from './views/Home'; 
import   Page from './views/Page'; 

 export default class Navegation extends React.Component {  
  render() {   
  return  (  
  <Provider store={this.props.store}>   
    <Router> 
<div> 
      <Route  exact path='/' component={withRouter(connect(this.props.mapStateToProps)(Home)) }/>
     <Route  exact path='/page' component={withRouter(connect(this.props.mapStateToProps)(Page)) }/>
 
     </div> 
    </Router> 
 </Provider> 
 );  
   }  
}