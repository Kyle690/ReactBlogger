import {database} from "../../Firebase";

export const addComment =(id,text,callback)=>(dispatch,getState)=>{

    const {displayName,avatar,uid}=getState().auth;

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

export const addReply=(id,commentId,text,callback)=>(dispatch,getState)=>{

    const {displayName,avatar,uid}=getState().auth;
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
