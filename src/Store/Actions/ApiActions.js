import {apiKey, database} from "../../Firebase";
import axios from 'axios';

export const UpdateViewCounter=(blogId,callback)=>async dispatch=>{

   await axios.post('https://us-central1-fir-d4dc1.cloudfunctions.net/returnToken',{key:apiKey})
        .then(async response=>{
            const {status,token,msg}=response.data;

            if(status===1){

                const key = token.split('.').join('');
                const ref = await database.ref(`blogs/${blogId}/views`);
                ref.once("value").then(snap=>{
                   const views = snap.val();

                    if(views !== null && views !== undefined){
                        if(!views[key]){
                            const newRef =database.ref(`blogs/${blogId}`);

                            views[key]=Date.now();

                            newRef.update({views:views})
                                .then(()=>callback({status:1, token}))
                                .catch(err=>callback({status:2,msg:err.message}));
                        }else{
                            callback({status:1,token});
                        }
                    }else{
                        ref.update({
                            [key]:Date.now()
                        })
                            .then(()=>callback({status:1, token}))
                            .catch(err=>callback({status:2,msg:err.message}));
                    }
                }).catch(err=>callback({status:2,msg:err.message}));
            }else{
                callback({status:2,msg})
            }

        }).catch(err=>callback({status:2,msg:err}));

};