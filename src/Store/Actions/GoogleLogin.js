import {database,auth} from "../../Firebase";
import firebase from "firebase";
import axios from 'axios';
import {AUTH_LOGIN, AUTH_LOGOUT, TOKEN_KEY} from "../types";

export const GoogleLogin=(callback)=>dispatch=>{

    let provider =  new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result=>{
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const {displayName,photoURL,uid} = result.user;

            axios.post('https://us-central1-fir-d4dc1.cloudfunctions.net/CreateToken',{uid})
                .then(response=>{
                    const {status,token}=response.data;
                    if(status===1){
                        localStorage.setItem(TOKEN_KEY,token);
                    }
                    dispatch({type:AUTH_LOGIN,payload:{displayName,avatar:photoURL,uid}})
                })
                .catch(err=>callback({status:2,msg:err.message}));



    })
        .catch(err=>callback({status:2,msg:err.message}));



};
export const GoogleLogOut=()=>dispatch=>{

    auth.signOut()
        .then(()=>{
            dispatch({type:AUTH_LOGOUT});
            localStorage.removeItem(TOKEN_KEY);
        })
        .catch(err=>console.log(err.message))


};
export const ReAuthenticate=(callback)=>dispatch=>{

    if(localStorage.getItem(TOKEN_KEY)){
        auth.signInWithCustomToken(localStorage.getItem(TOKEN_KEY))
            .then(()=>{
               auth.onAuthStateChanged(user=>{
                   const {uid,displayName,photoURL}=user;
                    dispatch({type:AUTH_LOGIN,payload:{uid,displayName,avatar:photoURL}});
               })
            })
            .catch(err=>console.log(err.message))
    }else{
        callback({status:2})
    }


};