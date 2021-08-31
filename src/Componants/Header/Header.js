import React, { Component } from 'react'
import {Navbar, NavbarBrand, Nav, NavItem} from 'reactstrap'
import { NavLink } from 'react-router-dom';
import './header.css';
import Logo from '../../assets/images.png'
import { connect } from 'react-redux';

const mapStateToProps=(state)=>{
    return{
        token:state.token,
        userid:state.userid,
    }

}

 class Header extends Component {


    render(){

        let links=null;
        if(this.props.token===null){
          links=( <Nav className="mr-md-5">
          <NavItem> 
              <NavLink to="/login" exact className="Navlink">Login</NavLink>
          </NavItem>
      </Nav>)
        }
        else{
            links=( <Nav className="mr-md-5">
            <NavItem> 
                <NavLink to="/" exact className="Navlink">BurgerBuilder</NavLink>
                <NavLink to="/Orders" exact className="Navlink">Orders</NavLink>
                <NavLink to="/logout" exact className="Navlink">Logout</NavLink>
            </NavItem>
        </Nav>)
        }
          return (
        <div className="Navigation">
           <Navbar style={{backgroundColor:"#D70F64", height:"70px"}}>
               <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                  <img src={Logo} alt="logo can't find" width="80px"/>
               </NavbarBrand>
               {links}
           </Navbar>
        </div>
    )
    }
  
}
export default connect(mapStateToProps)(Header);