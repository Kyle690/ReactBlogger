import {LOAD_DATA} from "../types";

const INITIAL_STATE={
    blogs:null,
    data:null,
    categories:[],
    settings:{
        primaryColor: "",
        primaryFont: "",
        secondaryColor: "",
        secondaryFont: "",
        tertiaryColor: ""
    },
    loaded:false
};

export default (state=INITIAL_STATE,action)=>{
    if(action.type===LOAD_DATA){
        const {blogs,data,settings,categories}=action.payload;
        return {
            ...state,
            blogs:blogs!==undefined?blogs:null,
            data:data!==undefined?data:null,
            settings,
            categories:categories!== undefined?Object.values(categories):[],
            loaded:true
        }
    }else{
        return {...state};
    }
}

