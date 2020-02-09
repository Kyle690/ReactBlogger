import React from "react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Button from "../CustomButtons/Button";
import Grid from "@material-ui/core/Grid";
import {Facebook, Instagram,YouTube,Twitter, Email} from "@material-ui/icons";
import {connect}from 'react-redux';

const SocialBar=(props)=>{

    const {contactEmail,facebook,instagram,youtube,twitter}=props.links;

    return (
        <GridContainer style={{paddingTop:'1%', paddingBottom:'1%'}}>
            <GridItem xs={12}container justify={'center'} >
                <h2>Follow Me</h2>
            </GridItem>
            <Grid container justify={'space-around'}>
            {facebook!==''?
                <a href={facebook}>
                    <Button  round justIcon style={{fontSize:100}}><Facebook /></Button>
                </a>
                :''
            }
                {instagram!==''?
                    <a href={instagram}>
                        <Button round justIcon><Instagram style={{fontSize:40}}/></Button>
                    </a>:''
                }
                {youtube!==''?
                    <a href={youtube}>
                        <Button  round justIcon><YouTube style={{fontSize:40}}/></Button>
                    </a>:''
                }
                {twitter!==''?
                    <a href={twitter}>
                        <Button round justIcon><Twitter style={{fontSize:40}}/></Button>
                    </a>:''
                }
                {contactEmail!==''?
                    <a href={'mailto:'+contactEmail}>
                        <Button round justIcon><Email style={{fontSize:40}}/></Button>
                    </a>:''
                }
            </Grid>

        </GridContainer>
    )


};
const mapStateToProps=state=>{
  return {
      links:state.content.data.socialLinks
  }
};

export default connect(mapStateToProps)(SocialBar);