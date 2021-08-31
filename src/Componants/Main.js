import React, { Component } from 'react'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Header from './Header/Header'
import { Redirect, Route ,Switch } from 'react-router-dom'
import Orders  from './BurgerBuilder/orders/Orders'
import Checkout from './BurgerBuilder/orders/checkout/Checkout'
import Auth from './Auth/Auth'
import { connect } from 'react-redux'
import {authcheck} from '../redux/authActionCreater'
import Logout from './Auth/Logout'


const mapStateToProps=(state)=>{
    return{
        token:state.token,
        userid:state.userid,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        authcheck:()=>dispatch(authcheck())
    }
}


 class Main extends Component {
    componentDidMount(){
        this.props.authcheck();
    }
    render(){

        let routes=null
        if(this.props.token===null){
            routes=
            ( <Switch>
                <Route path="/login" component={Auth}></Route>
                <Redirect to ="/login"/>
            </Switch>)
           
               
        }
        else{
           routes=(
               <Switch>
                   <Route path="/logout" component={Logout}></Route>
                <Route path="/orders" component={Orders}></Route>
                  <Route path="/checkout" component={Checkout}></Route>
                <Route path="/" exact component={BurgerBuilder}></Route> 
                <Redirect to ="/"/>
               </Switch>
               ) 
         
        }

          return (
        <div>
            <Header/>
            <div className="container">
                {routes}
              
            </div>
           
        </div>
    )
    }
  
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);