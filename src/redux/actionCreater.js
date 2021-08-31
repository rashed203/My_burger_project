import * as actionType from './actionType';
import axios from 'axios';

export const AddIngrediant=(igtype)=>{
    return{ 
         type:actionType.ADDINGREDIANT,
         payload:igtype

    }
}

export const RemoveIngrediant=(igtype)=>
{
    return{
        type:actionType.REMOVEINGREDIANT,
        payload:igtype
    }
}

export const UpdatParchech=()=>{
    return{
        type:actionType.PARCHECH
    
    }
}

export const ResetIngrediant=()=>{
    return{type:actionType.resetIngrediant}
}

export const ORDERLOAD=(orders)=>{
    return{
        type:actionType.ORDER_LOAD,
        payload:orders
    }
}

export const ORDER_ERR=()=>{
    return{
        type:actionType.ORDER_ERR,

    }
}

export const FetchOrder=(token,userid)=>(dispatch)=>{

    const queryParams='&orderBy="userid"&equalTo="'+userid+'"';
    axios.get('https://burgerbuilder-4e6f3-default-rtdb.firebaseio.com/order.json?auth='+token+queryParams)
    .then(response=>{
        dispatch(ORDERLOAD(response.data));
    })
}