
import * as actionType from './actionType'
const INGREDIANT_PRICE = {
    meat: 40,
    chese: 30
}

const INITIAL_STATE = {

    ingrediants: [
        { type: "meat", amount: 0 },
        { type: "chese", amount: 0 }
    ],
    price: 80,
    parchase: false,
    orders:[],
    orderLoading:true,
    ordererr:false,
    token:null,
    userid:null,
    authLoading:false,
    authFailmsg:null,


}

const Reducer = (state = INITIAL_STATE, action) => {
    const ingrediant = [...state.ingrediants]
    switch (action.type) {
        case actionType.ADDINGREDIANT:
            for (let item of ingrediant) {
                if (item.type === action.payload) {
                    item.amount++
                }
            }
            return {
                ...state,
                ingrediants: ingrediant,
                price: state.price + INGREDIANT_PRICE[action.payload]
            }

        case actionType.REMOVEINGREDIANT:
            for (let item of ingrediant) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--
                }
            }
            return {
                ...state,
                ingrediants: ingrediant,
                price: state.price - INGREDIANT_PRICE[action.payload],
            }

        case actionType.PARCHECH:
            const sum = state.ingrediants.reduce((sum, element) => {
                return sum + element.amount;
            }, 0)

            return {
                ...state,
                parchase: sum > 0,
            }
        case actionType.resetIngrediant:
            return {
                ...state,
                ingrediants: [
                    { type: "meat", amount: 0 },
                    { type: "chese", amount: 0 }
                ],
                price: 80,
                parchase: false
            }
            case actionType.ORDER_LOAD:
                let orders=[];
                for(let key in action.payload){
                    orders.push({
                        ...action.payload[key],
                        id:key,
                    })
                }
             
                return{
                    ...state,
                    orders:orders,
                    orderLoading:false,
                }
            case actionType.ATUH_SUCCESS:
                return{
                    ...state,
                    token:action.payload.token,
                    userid:action.payload.userid
                }
            case actionType.AUTH_LOGOUT:
                return{
                    ...state,
                    authFailmsg:null,
                    token:null,
                    userid:null,
                }
            case actionType.AUTH_LOADING:
                return{
                    ...state,
                   authLoading:action.payload,
                }

            case actionType.AUTH_LOADING:
                return{
                    ...state,
                   authFailmsg:action.payload,
                }
        default: return state;
    }

}
export default Reducer;