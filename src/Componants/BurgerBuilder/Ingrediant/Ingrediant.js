import React from 'react'
import BreadTop from '../../../assets/images/breadtop.jpg';
import BreadBottom from '../../../assets/images/breadbottom.jpg';
import Meat from '../../../assets/images/meat.png';
import Chese from '../../../assets/images/chese.png';
import './ingrediant.css'

export const Ingrediant = (props) => {

    let ingrediant = null;
    switch(props.type){
        case 'breadtop' :
        ingrediant=<div> <img src={BreadTop} alt="breadtop"/> </div>
        break;
        case 'breadbottom':
             ingrediant=<div> <img src={BreadBottom} alt="breadbottom"/> </div>
        break;
        case 'meat':
            ingrediant=<div> <img src={Meat} alt="meat"/> </div>
       break;
       case 'chese':
        ingrediant=<div> <img src={Chese} alt="chese"/> </div>
         break;
       default: 
       ingrediant=null
    }

    return (
        <div className="ingrediant">
            {ingrediant}
        </div>
    )
}
