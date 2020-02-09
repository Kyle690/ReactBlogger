import React from 'react';
import {connect}from 'react-redux';
import {withStyles, Grid} from "@material-ui/core";
import landingPageStyle from "../assets/jss/material-kit-react/views/landingPage";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import Parallax from "../components/Parallax/Parallax";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import classNames from 'classnames';
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody";
import HtmlParser from "react-html-parser";
import BlogDivider from "../CustomComponents/Divider";
import Footer from "../CustomComponents/Footer";
import {BlogFooter} from "../components/Footer/BlogFooter";
import {Helmet} from "react-helmet/es/Helmet";


class Disclaimer extends React.Component{
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render(){
        const {data,classes, ...rest}=this.props;
        return (
            <div>
                <Helmet>
                    <title>{data.title}</title>
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
                <Parallax small filter image={data.bannerImage}>
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
                                <Grid container justify={'center'} alignItems={'center'} direction={'column'}>
                                    {HtmlParser(data.content)}
                                </Grid>
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
        data:data.disclaimerPage
    }


};
export default connect(mapStateToProps)(withStyles(landingPageStyle)(Disclaimer));