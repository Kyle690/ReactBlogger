import React from 'react';
import {connect}from'react-redux';
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import Parallax from "../components/Parallax/Parallax";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import HtmlParser from "react-html-parser";
import {BlogFooter} from "../components/Footer/BlogFooter";
import classNames from 'classnames';
import {withStyles, Grid,Avatar} from "@material-ui/core";
import landingPageStyle from "../assets/jss/material-kit-react/views/landingPage";
import BlogDivider from "../CustomComponents/Divider";
import Footer from "../CustomComponents/Footer";
import CardBody from "../components/Card/CardBody";
import Card from "../components/Card/Card";
import {Helmet} from "react-helmet/es/Helmet";


class About extends React.Component{
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render(){
        const {data,classes, ...rest}=this.props;
        return (
            <div>
                <Helmet>
                    <title>{data.title}</title>
                    {/*need to add description in here*/}
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
                <Parallax small filter={data.filter} image={data.bannerImage}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem container justify={'center'} alignItems={'center'}>
                                <h1>{data.bannerTitle}</h1>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>
                <div className={classNames(classes.main)}>
                    <Grid container justify={'center'} direction={"column"}>
                        <Card>
                            <CardBody>
                                <GridItem xs={12} container justify={'center'} alignItems={'center'} direction={'column'}>
                                    <Avatar style={{height:200,width:200}} src={data.blogAvatar}/>
                                    <h4>{data.blogAuthor}</h4>
                                    {HtmlParser(data.content)}
                                </GridItem>
                            </CardBody>
                        </Card>
                    </Grid>
                    <BlogDivider/>
                    <Footer/>
                </div>
                <BlogFooter/>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    const {settings, data}=state.content;
  return {
      settings,
      data:data.aboutMe,
  }
};
export default connect(mapStateToProps)(withStyles(landingPageStyle)(About));