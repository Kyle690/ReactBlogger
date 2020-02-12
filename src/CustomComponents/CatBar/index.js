import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Tabs,Tab} from '@material-ui/core';
import history from "../../history";



export const CatBar=(props)=> {
    const classes = makeStyles(theme => ({
        root: {
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }));

    const {categories, active}=props;
    const activeIndex = active!=='' && active!==undefined?categories.reduce((a,v,i)=>{
        if(active===v){
            a=i
        }
        return a;
    },0):'';


    function a11yProps(value) {
        return {
            id: `simple-tab-${value}`,
            'aria-controls': `simple-tabpanel-${value}`,
        };
    }

    const handleChange =(event, newValue)=> {
       const catValue=categories[newValue];

       history.push(`/blog/categories:${catValue}`)
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={activeIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {categories.map(cat=>(
                        <Tab key={cat} label={cat} {...a11yProps(cat)}/>
                    ))}
                </Tabs>
            </AppBar>
        </div>
    );
};