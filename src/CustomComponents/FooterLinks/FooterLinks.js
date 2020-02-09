import React from "react";
import {Link}from 'react-router-dom';
import {Grid} from "@material-ui/core";

import './FooterLinks.css';
const FooterLinks=()=>{

    return (
        <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
            <Link to={'/'} className={'footerLink'}>
                Home
            </Link>
            <Link to={'/about'} className={'footerLink'}>
                About
            </Link>
            <Link to={'/blog'} className={'footerLink'}>
                Blog Posts
            </Link>
            <Link to={'/disclaimer'} className={'footerLink'}>
                Disclaimer
            </Link>
        </Grid>
    )
};

export default FooterLinks;