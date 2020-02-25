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
import {GoogleLogin, GoogleLogOut} from "../../Store/Actions/GoogleLogin";

function HeaderLinks({ ...props }) {
  const { classes, auth} = props;

  const {isLoggedIn,avatar}=auth;
  const handleLogin=()=>{
      props.GoogleLogin(res=>{
          res.status===1?
              alert('You have been logged in successfully.'):
              alert(res.msg);
      })
  };
  const handleLogout=()=>{
    props.GoogleLogOut()
  };
  return (
    <List className={classes.list}>
        <ListItem className={classes.listItem} >
            <Link to={'/'} className={classes.navLink}>
                Home
            </Link>
        </ListItem>
        <ListItem className={classes.listItem} >
          <Link to={'/about'} className={classes.navLink}>
              About Me
          </Link>
      </ListItem>
        <ListItem className={classes.listItem} >
            <Link to={'/blog'} className={classes.navLink}>
                Blog Posts
            </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
            {isLoggedIn?
                <Tooltip title={'Logout'}>
                    <div onClick={handleLogout}>
                        <ListItemAvatar className={classes.navLink}>
                            <Avatar style={{height:25,width:25}} alt={'profile'} src={avatar} />
                        </ListItemAvatar>
                    </div>
                </Tooltip>:
                <Tooltip title={'Login'}>
                    <div onClick={handleLogin}>
                        <ListItemAvatar className={classes.navLink}>
                            <Avatar style={{height:25,width:25}} alt={'profile'}/>
                        </ListItemAvatar>
                    </div>
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


export default connect(mapStateToProps,{GoogleLogin, GoogleLogOut})(withStyles(headerLinksStyle)(HeaderLinks));
