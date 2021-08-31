import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FetchOrder } from '../../../redux/actionCreater'
import OrderDetail from './OrderDetail'
 

const mapDispatchToProps=(dispatch)=>{
    return{
        fetchorder:(token,userid)=>dispatch(FetchOrder(token,userid)),
    }

}

const mapStateToProps=(state)=>{
    return{
        order:state.orders,
        orderLoading:state.orderLoading,
        ordererr:state.ordererr,
        token:state.token,
        userid:state.userid,
    }
}

class Orders extends Component {
    componentDidMount(){
        this.props.fetchorder(this.props.token,this.props.userid)
    }
    render() {
            const orderdetail= this.props.order.map(item=>{
                return(
                    <OrderDetail deliveryaddress={item.customer.deliveryaddress}
                    phone={item.customer.phone}
                    payment={item.customer.payment}
                    id={item.id} 
                    price={item.price}/>
                )
            })

        return (
            <div >
             {orderdetail}
            </div>
        )
    }

}

export default connect(mapStateToProps,mapDispatchToProps) (Orders);
