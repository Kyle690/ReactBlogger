import React from "react";
import {connect}from 'react-redux';
import Interweave from 'interweave';

import "../assets/css/tinyMce.css";
class TestView extends React.Component{
    render(){
        return (
            <div>
                <Interweave
                    content={this.props.content}
                />
            </div>
        )
    }
}
const mapStateToProps = state=>{
  return {
      content:state.content.data.test.content
  }
};


export default connect(mapStateToProps)(TestView);