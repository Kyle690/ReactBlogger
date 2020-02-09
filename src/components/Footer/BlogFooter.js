import React from "react";
import Grid from "@material-ui/core/Grid";



export const BlogFooter=(props)=>{
    return (
        <Grid container justify={'center'}>
            <p>&copy; {new Date().getFullYear().toString()} My Pale Legs</p>
        </Grid>
    )
};