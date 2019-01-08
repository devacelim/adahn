import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
// import {getComment} from '../services/post.js';
import cookie from 'react-cookies'

import {getLogin} from '../services/post.js';
import TableCell from "@material-ui/core/TableCell/TableCell";
import {regComment,getComment} from "../services/post";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});



class AddCommentLayer extends Component {

    constructor(props){

        super(props);

        this.state= {
            open: true,
            comment:'',
            data:[],
            fetching:false,
            // contents:''

        };
        this.handleClose = this.handleClose.bind(this);

        // console.log()
    }
    componentWillMount(){
        this.getComment()
    }
    handleClose () {
        this.setState({ open: false });
       this.props.CommentHandler(true);
    };


    handleChange(e){
      let nextState={};

      nextState[e.target.name] = e.target.value;


      this.setState(nextState);

    };

    async submitHandler(){
        // console.log(this.state.comment)
        this.setState({fetching:true})
         let obj={
            id:this.props.Id,
            writer:this.props.User,
            comment:this.state.comment,

        }
         let res = await regComment(obj);
        // console.log(res)
        if ( res.data.affectedRows==1)
        {
                // alert('등록 되었습니다.');
                 this.getComment()

        }
        //   this.setState({ open: false });
        // this.props.CommentHandler(this.state.comment);
    }
     async getComment(){

        let res = await getComment(this.props.Id);
        this.setState({data:res.data,fetching:false,comment:''})
        // console.log(res)
    }


    render() {
               const {classes} = this.props;
        return (
          <div>

            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              disableBackdropClick={true}
              disableEscapeKeyDown={true}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"상세 보기"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">

                     <TextField
                            id="standard-multiline-flexible"
                            label="상담내용"
                            // name="comme"
                            multiline
                            rowsMax="6"
                            disabled
                            value={this.props.Contents}
                            // onChange={this.handleChange.bind(this)}
                            className={classes.textField}
                            margin="normal"
                    />
                    {this.state.data.map(element=> {

                        return <ReplyView data={element} key={element.id}/>
                    }) }






                    {this.props.CommentYn ?
                     <TextField
                            id="standard-multiline-flexible"
                            label="댓글추가"
                            name="comment"
                            multiline
                            rowsMax="6"
                            value={this.state.comment}
                            onChange={this.handleChange.bind(this)}
                            className={classes.textField}
                            margin="normal"
                    />
                        :''}
                        <br/>

                        {this.props.CommentYn ?
                        <Button onClick={this.submitHandler.bind(this)} color="primary">
                              댓글등록
                        </Button>

                            :''}





                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  닫기
                </Button>


              </DialogActions>
            </Dialog>
          </div>
        );
      }


};

class ReplyView extends Component{


    render(){
        return(
            <li>
                {this.props.data.comment} ({this.props.data.writer_name}, {this.props.data.comment_date})
            </li>
        )
    }
}
export default withStyles(styles)(AddCommentLayer);
