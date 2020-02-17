import React from "react";
import {Breadcrumbs, withStyles} from "@material-ui/core";
import landingPageStyle from "../../assets/jss/material-kit-react/views/landingPage";
import {connect} from 'react-redux';
import {CatBar} from "../../CustomComponents/CatBar";
import {Helmet} from "react-helmet/es/Helmet";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import {Link} from "react-router-dom";
import classNames from 'classnames';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import BlogDivider from "../../CustomComponents/Divider";
import Footer from "../../CustomComponents/Footer";
import {BlogFooter} from "../../components/Footer/BlogFooter";
import history from "../../history";
import BlogCard from '../../CustomComponents/BlogCard/';

class BlogCategories extends React.Component{

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    renderCategories=()=>{
      const {categories, activeCat}=this.props;
      if(categories){
          if(categories.length>0){
              return (
                  <CatBar
                    active={activeCat}
                    categories={categories}
                  />
              )
          }
      }
    };

    renderBlogPosts=()=>{
        const { activeCat, blogs}=this.props;
        const noPosts= <div style={{textAlign:'center'}}>No posts yet!</div>;
        if(activeCat){

            if(blogs){
                if(blogs.length>0){
                    const blogContent=blogs.map((blog,index)=>{
                        const {title,categories,images,date,id}=blog;

                        if(categories.includes(activeCat)){
                            return (
                                <GridItem key={index} xs={12} sm={12} md={4} container justify={'center'}>
                                    <BlogCard
                                        title={title}
                                        image={images[0]}
                                        date={date}
                                        onClick={()=>history.push(`/blog/posts:${id}`)}
                                    />
                                </GridItem>
                            )
                        }


                    });

                    return (
                        <GridContainer>
                            {blogContent?blogContent:noPosts}
                        </GridContainer>
                    )
                }
                else{
                    return noPosts;
                }
            }else{
                return noPosts
            }


        }else{
            history.push('/blog');
        }
    };

    render() {
        const {activeCat,data,classes, ...rest}=this.props;
        return(
            <div>
                <Helmet>
                    <title>Blog Posts - {activeCat}</title>
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
                    <Link aria-current="page" to={`/blog/categories:${activeCat}`}>{activeCat}</Link>
                </Breadcrumbs>
                <div className={classNames(classes.main)} >
                    <GridContainer>
                        <GridItem xs={12} container justify={'center'} alignItems={'center'}>
                            <h3>What do you feel like?</h3>
                        </GridItem>
                        <GridItem xs={12} container direction={'row'} justify={'space-around'}>
                            {this.renderCategories()}
                        </GridItem>
                        <GridItem xs={12}>
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

const mapStateToProps=(state,ownProps)=>{

    const {data,blogs,settings}=state.content;
    const cat = ownProps.match.params.id.toString();
    const activeCat = cat.slice(1);

    return {
        activeCat,
        data,
        blogs,
        settings,
        categories:data.categories
    }
};


export default connect(mapStateToProps)(withStyles(landingPageStyle)(BlogCategories))