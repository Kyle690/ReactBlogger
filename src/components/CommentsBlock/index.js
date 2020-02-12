import React from "react";
import {Message, Reply} from '@material-ui/icons'
import {Divider, Grid, ListItemAvatar,ListItemText,ListSubheader,Avatar, ListItem} from "@material-ui/core";
import Button from "../CustomButtons/Button";
import {FormatDate, FilterReply} from '../../functions/';
import CustomInput from "../CustomInput/CustomInput";
const photo= require('../../assets/img/faces/kendall.jpg');

class CommentsBlock extends React.Component{

    state={
      mainComment:'',
      reply:'',
      replyId:'',
      mode:'main',
      comments:[
          {
              author:'Author Name',
              avatarUrl:photo,
              date:Date.now(),
              text:'This is a comment about the blog',
              id:'1',
              uid:'1231',
              replies:[
                  {
                      author:'Author Name',
                      avatarUrl:photo,
                      date:Date.now(),
                      text:'This is a reply comment',
                      id:'123',
                      authorId:'1231'
                  }
              ]
          }
      ]
    };

    handleChange=(name,id)=>event=>{
        if(id){
            this.setState({[name]:event.target.value,replyId:id, mode:'reply'})
        }else{
            this.setState({[name]:event.target.value, replyId:'',mode:'main'})
        }
    };

    renderComments=()=>{
        const commentProps=this.props.comments;
        if(commentProps){
            const comments = Object.keys(commentProps).reduce((a,v)=>{

                if(v!=='initial'){
                    commentProps[v]['id']=v;
                    a.push(commentProps[v]);
                }
                return a;
            },[]);

            if(comments.length>0){
                return comments.map(comment=>
                    <ListItem key={comment.id} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar style={{height:45,width:45}} alt={comment.author} src={comment.avatarUrl} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={(<span>{comment.author} - <span style={{color:'#6E6E6E', fontSize:12}}>{FormatDate(comment.date)}</span></span>)}
                            secondary={
                                (
                                    <div>
                                        {comment.text}
                                        {comment.replies!==undefined?
                                            Object.keys(comment.replies).map(reply=>{
                                                const {avatarUrl,author,text,date}=comment.replies[reply];
                                                return (
                                                    <ListItem  alignItems="flex-start" key={reply}>
                                                        <ListItemAvatar>
                                                            <Avatar style={{height:25,width:25}} alt={author} src={avatarUrl} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={(<span>{author} - <span style={{color:'#6E6E6E', fontSize:12}}>{FormatDate(date)}</span></span>)}
                                                            secondary={text}
                                                        />
                                                    </ListItem>
                                                )
                                            }):''
                                        }
                                        {this.props.loggedIn?
                                            <div>
                                                <CustomInput
                                                    id="mainComment"
                                                    inputProps={{
                                                        multiline:true,
                                                        placeholder: "Post a comment!",
                                                        onChange:(this.handleChange('reply', comment.id)),
                                                    }}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                                <Button onClick={()=>this.handleSubmit()} size={'sm'} >
                                                    <Reply/>
                                                    Reply
                                                </Button>
                                            </div>:<span><br/>Login to reply.</span>
                                        }

                                    </div>

                                )
                            }
                        />
                    </ListItem>

                )



            }else{
                return (
                    <p>Be the first to have your say.</p>
                )
            }
        }else{
            return (
                <p>Be the first to have your say.</p>
            )
        }

    };

    handleSubmit=()=>{
        const {mode, replyId,mainComment,reply}=this.state;
        const {loggedIn, onMainComment,onReplyComment}=this.props;

        if(loggedIn){
            if(mode==='reply' && replyId!==''){
                onReplyComment(FilterReply(reply),replyId);
                this.setState({mainComment: '',reply:'',replyId: '',mode:'main'});
            }else{
                onMainComment(FilterReply(mainComment));
                this.setState({mainComment: '',reply:'',replyId: '',mode:'main'})
            }
        }
    };

    renderMainInput=()=>{
        const {loggedIn, onLogin}=this.props;
        if(loggedIn){
            return (
                    <div style={{marginTop:-20,paddingLeft:10,paddingRight:10}}>
                        <CustomInput
                            id="mainComment"
                            inputProps={{
                                value:this.state.mainComment,
                                multiline:true,
                                placeholder: "Post a comment!",
                                onChange:(this.handleChange('mainComment')),
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                        <Button onClick={()=>this.handleSubmit()} block size={'sm'}>
                            Post
                        </Button>
                    </div>
            )
        }else{
            return (
                <Button style={{marginTop:20}} onClick={onLogin}  size={'sm'} block>
                    Login
                </Button>
            )
        }
    };

    render(){
        return (
            <div style={{backgroundColor:'#eeeeee', borderRadius:5, width:'100%'}}>
                <div style={{paddingLeft:10,paddingRight:10}}>
                    <Grid container direction={'row'} alignItems={'center'}>
                        <Message/>
                        <h4 style={{marginLeft:10}}>Comments</h4>
                    </Grid>
                    <Grid style={{marginTop:-20}}>
                        {this.renderMainInput()}
                        <Divider
                            style={{marginTop:10}}
                            variant={'fullWidth'}
                        />
                        {this.renderComments()}
                    </Grid>

                </div>
            </div>
        )
    }
}
export default CommentsBlock;