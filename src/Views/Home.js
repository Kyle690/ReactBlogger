import React from 'react';
import Header from "../components/Header/Header";
import {connect}from 'react-redux';
import classNames from 'classnames';
import HeaderLinks from "../components/Header/HeaderLinks";
import Parallax from "../components/Parallax/Parallax";
import {Grid, withStyles} from "@material-ui/core";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import HtmlParser, {convertNodeToElement} from "react-html-parser";
import Button from "../components/CustomButtons/Button";
import landingPageStyle from "../assets/jss/material-kit-react/views/landingPage";
import Card from "../components/Card/Card";
import BlogCard from '../CustomComponents/BlogCard/';
import {FormatDate} from "../functions";
import {BlogFooter} from "../components/Footer/BlogFooter";
import BlogDivider from "../CustomComponents/Divider";
import Footer from "../CustomComponents/Footer/";
import {Helmet} from "react-helmet/es/Helmet";
import history from "../history";
import Interweave from "interweave";

class Home extends React.Component{

    transformFunc=(node)=>{

        if(node.name==='p'){
            return convertNodeToElement(node);
        }else{
            return null;
        }
    };


    renderFirstBlog=()=>{
      const {blogs}=this.props;
        if(blogs.length>0){
            const {
                title,
                date,
                content,
                images,
                id
            }=blogs[0];


            return (
                <Card style={{width:'95%'}}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6} container justify={'center'} alignItems={'center'}>
                            <img style={{padding:15,maxWidth:'100%',width:"auto",height:'auto',maxHeight:400}} src={images[0]}/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} container  alignItems={'center'}>
                            <div>
                                <Grid container alignItems={'center'} style={{margin:'2%'}}>
                                    <h3>{title}</h3>
                                </Grid>
                                <div style={{margin:'2%'}}>
                                    {/*HtmlParser(content.substring(0,600),{transform:this.transformFunc})*/}
                                    <Interweave
                                        content={content.substring(0,600)+'...'}
                                    />
                                    <p style={{fontSize:12,color:'#3C4858'}}>Written: {FormatDate(date)}</p>
                                </div>
                                <Button onClick={()=>history.push(`blog/posts:${id}`)} size={'sm'} round>
                                    Read More
                                </Button>
                            </div>
                        </GridItem>
                    </GridContainer>
                </Card>

            )
        }else{
            return (
                <Card>
                    <Grid container justify={'center'}>
                        <h4>Nothing here yet</h4>
                    </Grid>
                </Card>

            )
        }

    };

    renderNextBlogs=()=>{
        const {blogs}=this.props;
        if(blogs.length>1){

            const blogPost = [blogs[1],blogs[2], blogs[3]];

            return (
                <GridContainer>
                    {blogPost.map(post=>{
                        if(post !== undefined){
                            const {images,title, id, date}=post;
                            return (
                                <GridItem xs={12} sm={12} md={4} key={id} container justify={'center'}>
                                    <BlogCard
                                        title={title}
                                        image={images[0]}
                                        date={date}
                                        onClick={()=>history.push(`blog/posts:${id}`)}
                                    />
                                </GridItem>
                            )
                        }

                    })}
                </GridContainer>
            )

        }
    };

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render(){
        const {data,classes, ...rest}=this.props;
        return (
            <div>
                <Helmet>
                    <title>{data.title}</title>
                    <description>{data.description}</description>
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
                <Parallax  filter={data.filter} image={data.bannerImage}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem container justify={'center'} alignItems={'center'}>
                               <h1>{data.bannerTitle}</h1>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={classNames(classes.main)}>
                    <GridContainer>
                        <GridItem xs={12} container justify={'center'}>
                            {this.renderFirstBlog()}
                        </GridItem>
                        <GridItem xs={12}>
                            <BlogDivider/>
                        </GridItem>
                        <GridItem xs={12} >
                            {this.renderNextBlogs()}
                        </GridItem>
                    </GridContainer>
                    <BlogDivider/>
                    <Footer/>
                </div>
                <BlogFooter/>
            </div>
        )
    }
}

const  mapStateToProps = state=>{
    const {settings, data, loaded, blogs}=state.content;

    return {
        settings,
        data:data.homePage,
        blogs
    }
};

export default connect(mapStateToProps)(withStyles(landingPageStyle)(Home));