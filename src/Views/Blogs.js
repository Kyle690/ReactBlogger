import React from 'react';
import {Helmet} from "react-helmet/es/Helmet";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import {connect}from 'react-redux';
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import {Link}from 'react-router-dom';
import classNames from 'classnames';
import {withStyles, Breadcrumbs} from "@material-ui/core";
import landingPageStyle from "../assets/jss/material-kit-react/views/landingPage";
import BlogCard from '../CustomComponents/BlogCard/';
import BlogDivider from "../CustomComponents/Divider";
import Footer from "../CustomComponents/Footer";
import {BlogFooter} from "../components/Footer/BlogFooter";
import {CatBar} from "../CustomComponents/CatBar";
import history from "../history";
class Blogs extends React.Component{

    renderCategories=()=>{
      const {categories}=this.props;
      if(categories){
          if(categories.length>0){
             return (
                 CatBar({categories})
             )
          }

      }

    };

    renderBlogPosts=()=>{
        const {blogs}=this.props;
        if(blogs){
            if(blogs.length>0){

                return (
                    <GridContainer >
                        {blogs.map(blog=>{
                            const {title,date,images, id}=blog;

                            return (
                                <GridItem xs={12} sm={12} md={4} lg={3} container justify={'center'}>
                                    <BlogCard
                                        title={title}
                                        date={date}
                                        image={images[0]}
                                        onClick={()=>history.push(`blog/posts:${id}`)}
                                    />
                                </GridItem>
                            )
                        })}
                    </GridContainer>
                )

            }else{
                return <div>No Content here yet</div>
            }
        }else{
            return <div>No Content here yet</div>
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
                    <title>Blog Posts</title>
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
                    <Link aria-current="page" to={'/blog'}>Blog Posts</Link>
                </Breadcrumbs>
                <div className={classNames(classes.main)} >
                    <GridContainer>
                        <GridItem xs={12} container justify={'center'} alignItems={'center'}>
                            <h3>What do you feel like?</h3>
                        </GridItem>
                        <GridItem xs={12} container direction={'row'} justify={'space-around'}>
                            {this.renderCategories()}
                        </GridItem>
                        <GridItem xs={12} >
                            {this.renderBlogPosts()}
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
const mapStateToProps=state=>{
    const {settings, data,  blogs}=state.content;
  return {
      settings,
      blogs,
      categories:data.categories
  }


};

export default connect(mapStateToProps)(withStyles(landingPageStyle)(Blogs));