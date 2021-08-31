import * as actionType from './actionType';
import axios from 'axios';

export const auth_success=(token , userid)=>{
    return{
        type:actionType.ATUH_SUCCESS,
        payload:{
            token:token,
            userid:userid,
        }
    }
}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expiretime');
    localStorage.removeItem('userid');
    return{
        type:actionType.AUTH_LOGOUT
    }
}

export const authloading=(isloading)=>{
    return{
        type:actionType.AUTH_LOADING,
        payload:isloading,
    }
}

export const authfail=(failmsg)=>{
    return{
        type:actionType.AUTH_FAILED,
        payload:failmsg,
    }
}


export const auth = (email,password,mode)=>dispatch=>{
    dispatch(authloading(true));
    const authData={
        email:email,
        password:password,
        returnSecureToken:true,
    }
    console.log(email,password);
    let authurl='';
    if(mode==="Sign Up"){
        authurl="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= ";
    }else{
        authurl="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    const apikey="AIzaSyCC1pQjRNHxopphVNmgWDTU_-bCwvh4hkY"
    

    axios.post(authurl+apikey,authData)
    .then(response=>{
        dispatch(authloading(false))
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userid',response.data.localId);
        const expiretime= new Date(new Date().getTime()+response.data.expiresIn*1000);
        localStorage.setItem('expiretime',expiretime);
        dispatch(auth_success(response.data.idToken,response.data.localId))
    })
    .catch(err=>{
        dispatch(authloading(false))  
         console.log(err.response.data.error.massage)
        dispatch(authfail(err.response.data.error.massage))
     
    })
      
}

 export const authcheck=()=>dispatch=>{
    const token=localStorage.getItem('token');
    if(!token){
        dispatch(logout())
    }
    else{
        const expiretime= localStorage.getItem('expiretime');
        if(expiretime<=new Date()){
            dispatch(logout())
        }
        else{
            const userid=localStorage.getItem('userid');
            dispatch(auth_success(token,userid));
        }
    }

}
 