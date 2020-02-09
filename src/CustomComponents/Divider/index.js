import React from 'react';
import Divider from "@material-ui/core/Divider";
const BlogDivider=()=>{
  const Style={
      borderTop:'2px solid #fff',
      borderRadius:5,
      boxShadow:'0px,1px,1px,-1px,rgba(0,0,0,0.5)',
      marginTop:'1%',
      marginBottom:'1%'
  };
  return (
      <Divider
        style={Style}
        variant={'middle'}
      />
  )

};
export default BlogDivider;