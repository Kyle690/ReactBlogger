import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles.jsx";

import { cardTitle } from "../../assets/jss/material-kit-react.jsx";
import {FormatDate} from "../../functions";

const styles = {
    ...imagesStyles,
    cardTitle,
};

const useStyles = makeStyles(styles);


export default (props)=>{
    const {title,image,onClick, date}=props;

    const classes = useStyles();
    return (
        <Card style={{width: "20rem"}}>
            <img
                style={{maxHeight: "180px",height:'100%',width:'auto',objectFit:'contain', display: "block"}}
                className={classes.imgCardTop}
                src={image}
                alt="image"
            />
            <CardBody>
                <h4>{title.length>30?title.substring(0,27)+'...':title}</h4>
                <p style={{fontSize:12,color:'#3C4858'}}>{FormatDate(date)}</p>
                <Button onClick={onClick} size={'sm'} round>Read More</Button>
            </CardBody>
        </Card>
    );




}