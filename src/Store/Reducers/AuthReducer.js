import {AUTH_LOGIN,AUTH_LOGOUT} from "../types";

const INITIAL_STATE={
  isLoggedIn:false,
  displayName:'',
  avatar:'',
  uid:'',
};
export default (state=INITIAL_STATE,action)=>{

    switch (action.type) {
        case AUTH_LOGIN:
            return {
                isLoggedIn:true,
                displayName:action.payload.displayName,
                avatar:action.payload.avatar,
                uid:action.payload.uid,
            };
        case AUTH_LOGOUT:
            return {
                isLoggedIn:false,
                displayName:'',
                avatar:'',
                uid:''
            };
        default:return {...state};
    }


};