/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import {connect}from 'react-redux';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";


import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import {Avatar, ListItemAvatar} from "@material-ui/core";

function HeaderLinks({ ...props }) {
  const { classes, login,logout, isLoggedIn, avatar } = props;
  return (
    <List className={classes.list}>
        <ListItem className={classes.listItem} >
            <Link to={'/'} className={classes.navLink}>
                Home
            </Link>
        </ListItem>
        <ListItem className={classes.listItem} >
          <Link to={'/about'} className={classes.navLink}>
              About Us
          </Link>
      </ListItem>
        <ListItem className={classes.listItem} >
            <Link to={'/blogs'} className={classes.navLink}>
                Blog Posts
            </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
            {isLoggedIn?
                <Tooltip title={'Logout'}>
                    <ListItemAvatar className={classes.navLink}>
                        <Avatar className={classes.small} alt={'profile'} src={avatar} />
                    </ListItemAvatar>
                </Tooltip>:
                <Tooltip title={'Login'}>
                    <ListItemAvatar className={classes.navLink}>
                        <Avatar style={{height:25,width:25}} alt={'profile'}/>
                    </ListItemAvatar>
                </Tooltip>
            }
        </ListItem>
    </List>
  );
}

const mapStateToProps=(state)=>{
    return {
        auth:state.auth
    }
};


export default connect(mapStateToProps)(withStyles(headerLinksStyle)(HeaderLinks));
