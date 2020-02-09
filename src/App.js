import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import history from "./history";
import {connect} from 'react-redux';

// functions
import {GetContent} from "./Store/Actions/ContentActions";

// components
import Home from './Views/Home';
import About from './Views/About';
import Blogs from "./Views/Blogs";
import Disclaimer from "./Views/Disclaimer";


import "./assets/scss/material-kit-react.scss";
import {Loading} from "./components/Loading";
import Danger from "./components/Typography/Danger";
class App extends React.Component{

    state={
        loaded:false,
        error:'',
        loading:true
    };

    componentWillMount() {
        if(!this.props.loaded){
            this.props.GetContent(res=>{
                res.status===1?
                    this.setState({loaded:true}):
                    this.setState({error:res.msg,loading:false})
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.loaded?
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/about" exact component={About}/>
                        <Route path={"/blog"} exact component={Blogs}/>
                        <Route path={"/disclaimer"} exact component={Disclaimer}/>
                    </Switch>
                </Router>:
                    <div>
                        <Loading
                            show={this.state.loading}
                        />
                        {!this.state.loading?
                            <Danger>{this.state.error}</Danger>:
                            ''
                        }
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        loaded:state.content.loaded
    }
};


export default connect(mapStateToProps,{GetContent})(App);