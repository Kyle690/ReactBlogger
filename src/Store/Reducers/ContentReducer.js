import {LOAD_DATA} from "../types";

const INITIAL_STATE={
    blogs:null,
    data:null,
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
        const {blogs,data,settings}=action.payload;

        return {
            ...state,
            blogs,
            data,
            settings,
            loaded:true
        }
    }else{
        return {...state};
    }
}

