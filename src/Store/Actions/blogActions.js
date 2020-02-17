import {database, auth} from "../../Firebase";

export const addComment =(id,text,callback)=>async(dispatch,getState)=>{

    const {displayName,avatar}=getState().auth;
    let uid =null;
   await auth.onAuthStateChanged(user=>{
        if(user){
            uid = user.uid;
        }else{
            callback({status:2, msg:'User not logged in'})
        }
    });



    const ref = database.ref(`blogs/${id}/comments`);
    ref.push({
        author:displayName,
        avatarUrl:avatar,
        date:Date.now(),
        text
    })
        .then(()=>callback({status:1}))
        .catch(err=>callback({status:2,msg:err.message}));
};

export const addReply=(id,commentId,text,callback)=>async(dispatch,getState)=>{

    const {displayName,avatar}=getState().auth;
    let uid =null;

    await auth.onAuthStateChanged(user=>{
        if(user){
            uid = user.uid;
        }else{
            callback({status:2, msg:'User not logged in'})
        }
    });

    const ref = database.ref(`blogs/${id}/comments/${commentId}/replies`);
    ref.push({
        author:displayName,
        avatarUrl:avatar,
        date:Date.now(),
        text
    })
        .then(()=>callback({status:1}))
        .catch(err=>callback({status:2,msg:err.message}));

};
