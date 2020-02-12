import React from 'react';
import {Breadcrumbs, withStyles, Grid} from "@material-ui/core";
import {connect}from 'react-redux';
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import {Helmet} from "react-helmet/es/Helmet";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import classNames from 'classnames';
import {Link} from "react-router-dom";
import history from "../../history";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import HtmlParser from "react-html-parser";
import Carousel from "react-slick";
import {Avatar} from "@material-ui/core";
import {FormatDate} from "../../functions";
import CommentsBlock from "../../components/CommentsBlock";
import BlogDivider from "../../CustomComponents/Divider";
import Footer from "../../CustomComponents/Footer";
import {BlogFooter} from "../../components/Footer/BlogFooter";
import {UpdateViewCounter} from "../../Store/Actions/ApiActions";
import {GoogleLogin} from "../../Store/Actions/GoogleLogin";
import {addComment, addReply} from "../../Store/Actions/blogActions";
import {Loading} from "../../components/Loading";


class ViewBlog extends React.Component{

    state={
        loading:false
    };

    componentDidMount() {
        window.scrollTo(0, 0)
    }


    componentWillMount() {
        this.props.UpdateViewCounter(this.props.id,res=>{
           if(res.status===2){
               console.log(res.msg);
           }
        });
    }

    handleMainComment=(text)=>{
        this.setState({loading:true});
        const id = this.props.id;
        this.props.addComment(id,text,res=>{
            if(res.status===1){
                this.setState({loading:false})
            }else{
                this.setState({loading:false});
                alert(res.msg)
            }
        })
    };

    handleReplyComment=(text,commentId)=>{
        const id = this.props.id;
        this.setState({loading:true});

        this.props.addReply(id,commentId,text,res=>{
            if(res.status===1){
                this.setState({loading:false});
            }else{
                this.setState({loading:false});
                alert(res.msg);
            }
        })



    };

    handleLogin=()=>{
        this.props.GoogleLogin(res=>{
            if(res.status===2){
                alert(res.msg);
            }
        });
    };

    renderBlog=()=>{
        const {id,blogPost}=this.props;
        if(id){
            const { title, images, content, author, date, allowComments, comments}=blogPost;
            const settings = {
                dots: true,
                infinite: true,
                speed: 600,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true
            };
            return (
                <GridContainer>
                    <GridItem xs={12} container justify={'center'}>
                        <Card>
                            <div style={{paddingLeft:'10%', paddingRight:'10%'}}>
                                <Grid container justify={'center'} alignItems={'center'} direction={'column'}>
                                    <h1>{title}</h1>
                                </Grid>
                                <div style={{marginTop:10,marginBottom:10}}>
                                    <Carousel {...settings}>
                                        {images.map((image,index)=>(
                                            <div key={index}>
                                                <img
                                                    style={{width:'auto',maxHeight:600}}
                                                    src={image}
                                                    alt={index+'image'}
                                                    className="slick-image"
                                                />
                                            </div>

                                        ))}
                                    </Carousel>
                                </div>
                                <div style={{padding:25}}>
                                    {HtmlParser(content)}
                                    <Grid style={{padding:25}} container direction={'row'} justify={'flex-start'} alignItems={'center'} >
                                        {author.photoURL!==''?
                                            <Avatar
                                                alt={'avatar'}
                                                src={author.photoURL}
                                            />:
                                            <Avatar><p>?</p></Avatar>
                                        }
                                        <div style={{marginLeft:10}}>
                                            <p>Author: {author.displayName}</p>
                                            <p>Written: {FormatDate(date)}</p>
                                        </div>
                                    </Grid>

                                </div>

                            </div>
                            <div>
                                {allowComments?
                                    <CommentsBlock
                                        loggedIn={this.props.auth.isLoggedIn}
                                        comments={comments}
                                        onLogin={this.handleLogin}
                                        onMainComment={this.handleMainComment}
                                        onReplyComment={this.handleReplyComment}
                                    />:''
                                }
                            </div>
                        </Card>
                    </GridItem>
                </GridContainer>
            )

        }else{
            history.push('/');
        }
    };

    render() {
        const {title,data,classes, ...rest}=this.props;
        return (
            <div>
                <Loading
                    show={this.state.loading}
                />
                <Helmet>
                    <title>{title}</title>
                    {/*need to add description in here*/}
                </Helmet>
                <Header
                    brand="My Pale Legs"
                    fixed
                    rightLinks={<HeaderLinks/>}
                    color="white"
                    changeColorOnScroll={{
                        height: 400,
                        color: "white"
                    }}
                    {...rest}
                />
                <Breadcrumbs style={{paddingTop:100,paddingLeft:15}}>
                    <Link color="inherit" to={"/"}>
                        Home
                    </Link>
                    <Link color="inherit" to={"/blog"}>
                        Blog Posts
                    </Link>
                    <Link aria-current="page" to={`/blog/categories:${title}`}>{title}</Link>
                </Breadcrumbs>
                <div className={classNames(classes.main)}>
                    {this.renderBlog()}
                    <BlogDivider/>
                    <Footer/>
                </div>
                <BlogFooter/>
            </div>
        )
    }
}
const mapStateToProps=(state,ownProps)=>{

    const {blogs,settings,data}=state.content;
    const blogId = ownProps.match.params.id.slice(1);
    let blogPost={};
    let title='';

    blogs.map(blog=>{
        if(blogId===blog.id){
            blogPost=blog;
            title=blog.title;

        }
    });

    return {
        id:blogId,
        settings,
        data,
        blogPost,
        title,
        auth:state.auth
    }
};

export default connect(mapStateToProps, {UpdateViewCounter, GoogleLogin, addComment, addReply})(withStyles(landingPageStyle)(ViewBlog))