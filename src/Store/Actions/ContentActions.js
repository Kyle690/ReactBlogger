import {database} from "../../Firebase";
import {LOAD_DATA} from "../types";

export const GetContent=(callback)=>dispatch=>{

    const ref = database.ref();
    ref.on('value',async snap=>{
       const content=snap.val();

       const {data,settings,blogs}=content;

       const blogKeys= Object.keys(blogs);
       let sortedBlogs=[];

      if(blogKeys.length>0){
           const dateNow=Date.now();

           sortedBlogs= blogKeys.reverse().reduce((a,v)=>{

               const blog=blogs[v];
               if(blog.publish && blog.date<=dateNow) {
                   blog['id'] = v;
                   a.push(blog)
               }
               return a;
           },[])
       }
       dispatch({type:LOAD_DATA,payload:{data,settings,blogs:sortedBlogs}});
        callback({status:1});
    });

};