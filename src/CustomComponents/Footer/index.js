import React from "react";
import {Grid} from "@material-ui/core";
import FooterLinks from "../FooterLinks/FooterLinks";
import SocialBar from "../../components/SocialBar";

const Footer =()=>{
  return (
      <Grid container justify={'center'}>
          <FooterLinks/>
          <SocialBar/>
      </Grid>
  )
};
export default Footer;