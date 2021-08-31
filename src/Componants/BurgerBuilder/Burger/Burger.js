import React from 'react'
import { Ingrediant } from '../Ingrediant/Ingrediant'
import './burger.css'

export const Burger = (props) => {
    let ingrediantarry=props.ingrediants.map(item=>{
        let amountarry=[...Array(item.amount).keys()]
        return amountarry.map(_=>{
            return <Ingrediant type={item.type} key={Math.random()}/>
        })
    })
  
    .reduce((arr,element)=>{
        return arr.concat(element);
    },[])
    if(ingrediantarry.length===0){
        ingrediantarry=<p>add something igrediants</p>
    }
    return (
        <div className="burger">
           <Ingrediant type="breadtop"/>
           {ingrediantarry}
           <Ingrediant type="breadbottom"/>
        </div>
    )
}
