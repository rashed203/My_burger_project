import React from 'react'
import { Card, CardBody, CardFooter, CardHeader,Button } from 'reactstrap'

const controls = [
    { label: "Chese", type: "chese" },
    { label: "Meat", type: "meat" }
]

const BurgerControls = props => {
    return (
        <div  className="d-flex ">
            <div className="m-auto ml-5 " style={{fontWeight:"bold",fontSize:"1.2rem"}}>{props.label}</div>
            <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
        </div>
    )
}

export const Controls = (props) => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{
                    backgroundColor: "#D70F64",
                    color: "white"
                }}>
                    <h2>Add Ingrediant</h2>
                </CardHeader>
                <CardBody>
                    {controls.map(item => {
                        return <BurgerControls
                            label={item.label}
                            type={item.type}
                            key={Math.random()} 
                            added={()=>props.addingrediant(item.type)}
                            removed={()=>props.removeingrediant(item.type)}/>
                            
                    })}
                </CardBody>
                <CardFooter>
                    <h5>Price <strong>{props.price}</strong> BDT</h5>
                     
                </CardFooter>
               <Button style={{backgroundColor:"#D70F64"}} disabled={!props.parchase} color="secondary" onClick={props.toggol}>Show Card</Button>
            </Card>
        </div>
    )
}
