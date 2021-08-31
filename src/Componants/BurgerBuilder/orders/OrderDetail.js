import React from 'react'
import { Card, CardBody, CardText ,Row,Col } from 'reactstrap';

const OrderDetail = (props) => {
    console.log(props)
    return (
        <div>
            <div >
                <Row>
                    <Col sm="6">  
                            <Card style={{
                border: "1px solid grey",
                borderRadius: "2px", padding: "3px",margin:"10px"
            }}>
                    <CardBody>
                        <CardText><strong >Id: </strong>{props.id}</CardText>
                        <CardText><strong>Delivery Address:</strong> {props.deliveryaddress} </CardText>
                        <CardText> <strong>Phone:</strong>{props.phone}</CardText>
                        <CardText> <strong>Payment:</strong>{props.payment}</CardText>
                        <CardText> <strong>Price:</strong> {props.price}</CardText>
                    </CardBody>
                </Card>
                    </Col>
                </Row>
      
            </div>
            <div>




            </div>
        </div>
    )
}
export default OrderDetail;