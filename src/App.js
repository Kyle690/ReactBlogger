import React from "react";
import {Route, Router, Switch, Link} from "react-router-dom";
import history from "./history";
import {connect} from 'react-redux';
import CookieConsent from "react-cookie-consent";
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
import BlogCategories from "./Views/Blogs/BlogCategories";
import ViewBlog from "./Views/Blogs/ViewBlog";
import {ReAuthenticate} from "./Store/Actions/GoogleLogin";
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
            });

            this.props.ReAuthenticate(res=>{

            });
        }
    }

    render() {
        return (
            <div>
                <CookieConsent
                    location="bottom"
                    buttonText="Accept"
                    cookieName="pale-legs-cookie-accept"
                    style={{ background: "#2B373B" }}
                    buttonStyle={{ color: "#4e503b", fontSize: "13px", backgroundColor:'#efe' }}
                    expires={150}
                >
                    This website uses cookies to enhance the user experience.
                </CookieConsent>
                {this.state.loaded?
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/about" exact component={About}/>
                        <Route path={"/blog"} exact component={Blogs}/>
                        <Route path={"/blog/categories:id"} exact component={BlogCategories}/>
                        <Route path={'/blog/posts:id'} exct component={ViewBlog}/>
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


export default connect(mapStateToProps,{GetContent, ReAuthenticate})(App);