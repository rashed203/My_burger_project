import React, { Component } from 'react'
import { Burger } from './Burger/Burger'
import { Controls } from './controls/controls'
import {Modal,ModalBody,ModalFooter,ModalHeader,Button} from 'reactstrap';
import { Summary } from './summary/Summary';
import {connect} from 'react-redux';

import {AddIngrediant,RemoveIngrediant,UpdatParchech}from '../../redux/actionCreater'

const mapStateToProps=(state)=>{
    return{
        ingrediants:state.ingrediants,
        parchase:state.parchase,
        price:state.price
    }

}

const mapDispatchToProps=(dispatch)=>{
    return{
        AddIngrediant:(igtype)=>dispatch(AddIngrediant(igtype)),
        RemoveIngrediant:(igtype)=>dispatch(RemoveIngrediant(igtype)),
        UpdatParchech:()=>dispatch(UpdatParchech()),
    }
}

class BurgerBuilder extends Component {
    state = {
        modalOpen:false
    }

    addIngrediantHandle = type => {
   
       this.props.AddIngrediant(type)
       this.props.UpdatParchech()
            
    }
    removeIngrediantHandle = type => {
     this.props.RemoveIngrediant(type)
     this.props.UpdatParchech()
    }
    handlecheckout=()=>{
        this.props.history.push("/checkout")
    }

    toggolbutton=()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
    }
    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingrediants={this.props.ingrediants} />
                    <Controls addingrediant={this.addIngrediantHandle}
                        removeingrediant={this.removeIngrediantHandle}
                        price={this.props.price} 
                        toggol={this.toggolbutton}
                        parchase={this.props.parchase}
                        />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your order summary</ModalHeader>
                    <ModalBody>
                        <h5>Price : {this.props.price}</h5>
                        <Summary ingrediant={this.props.ingrediants} />
                    </ModalBody>
                    <ModalFooter>
                         <Button style={{backgroundColor:"#D70F64"}} onClick={this.handlecheckout} >Check out</Button>
                        <Button color="secondary" onClick={this.toggolbutton}>Close</Button> 
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);