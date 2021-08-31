import React, { Component } from 'react';
import { Button, Modal,ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../spinner/spinner';
import {ResetIngrediant} from '../../../../redux/actionCreater'
const mapStateToProps = (state) => {
    return {
        ingrediants: state.ingrediants,
        price: state.price,
        parchase: state.parchase,
        userid:state.userid,
        token:state.token,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        resetorder:()=>dispatch(ResetIngrediant())
    }
}
class Checkout extends Component {
    state = {
        values: {
            deliveryaddress: "",
            phone: "",
            payment: "Cash On Delevery",
        },
        isLoading:false,
        isModalOpen:false,
        orderMsg:'',
    }

    onchangeHandle = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }

        })

    }
    goBack = () => {
        this.props.history.goBack("/")
    }
    submitHandel = () => {
        this.setState({
            isLoading: true
        })
        const order = {
            ingrediants: this.props.ingrediants,
            customer: this.state.values,
            price: this.props.price,
            ordertime: new Date(),
            userid:this.props.userid,
        }
        console.log(order)
        axios.post("https://burgerbuilder-4e6f3-default-rtdb.firebaseio.com/order.json?auth="+this.props.token, order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ isLoading: false ,
                    isModalOpen:true,
                orderMsg:"Order Place Successfully"})
                this.props.resetorder();
                    
                }
                else {
                    this.setState({ isLoading: false ,
                        isModalOpen:true,
                        orderMsg:"Somting went worng"})
                }
            })
            .catch(err => {
                this.setState({ isLoading: false ,
                    isModalOpen:true,
                    orderMsg:"Something went worng"})
            })
    }

    render() {
        let form = (<div>
            <h4 style={{
                border: "2px solid grey"
                , borderRadius: "2px",
                padding: "5px"
            }}>Total Price: {this.props.price}</h4>
            <form style={{
                border: "1px solid grey",
                padding: "10px",
                boxShadow: "1px 1px grey"
            }}>
                <textarea name="deliveryaddress" placeholder="Your Delivery Address"
                    className="form-control" value={this.state.values.deliveryaddress}
                    onChange={(e) => this.onchangeHandle(e)}></textarea>
                <br />
                <input name="phone" placeholder="Your Number" className="form-control"
                    onChange={(e) => this.onchangeHandle(e)} value={this.state.values.phone} />
                <br />
                <select name="payment" className="form-control" onChange={(e) => this.onchangeHandle(e)}>
                    <option value="Cash On Delivery">Cash On delivery</option>
                    <option value="Bkash">Bkash</option>
                </select>
                <Button disabled={!this.props.parchase} className="btn text-white" style={{ backgroundColor: "#D70F64", margin: "3px" }} onClick={this.submitHandel} >Order Place</Button>
                <Button className="btn text-white" style={{ backgroundColor: "#D70F64", margin: "3px" }} onClick={this.goBack}>Cencel</Button>
            </form>
        </div>)
        return (
            <div >
                {this.state.isLoading?<Spinner/>:form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        {this.state.orderMsg}
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout)
