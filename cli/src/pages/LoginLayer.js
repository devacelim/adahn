import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

import cookie from 'react-cookies'

import {getLogin} from '../services/post.js';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});



class LoginLayer extends Component {

    constructor(props){

        super(props);
// console.log(this.props)
        this.state= {
            open: true,
            id:'',
            pwd:'',
            failed:false,
            blank:false

        };
        this.handleClose = this.handleClose.bind(this);

        // console.log()
    }

    handleClose () {

        this.setState({ open: false });
       this.props.LoginHandler(true);

    };

    async Login(){

        if ( !this.state.id || !this.state.pwd) {
            this.setState({blank: true,failed:false})
            return
        }
        // this.setState({fetching:true})

        let res = await getLogin({id:this.state.id,pwd:this.state.pwd});

        if(res.auth ==1)
        {
            //성공
                cookie.save('user_id',res.data[0].user_id, { path: '/' ,maxAge: 3600*12})
             cookie.save('user_dept',res.data[0].user_dept, { path: '/' ,maxAge: 3600*12,})
             cookie.save('user_email',res.data[0].user_email, { path: '/' ,maxAge: 3600*12})
            cookie.save('user_position',res.data[0].user_position, { path: '/' ,maxAge: 3600*12})
             cookie.save('user_name',res.data[0].user_name, { path: '/' ,maxAge: 3600*12})
            cookie.save('user_phone',res.data[0].user_phone, { path: '/' ,maxAge: 3600*12})
        // console.log(cookie.loadAll() )
             this.setState({ open: false });
                this.props.LoginHandler();
        }
        else{
            //실패
            this.setState({failed:true,blank:false})

        }

    }
      _handleKeyPress(e) {

    	if (e.key === 'Enter'){
    	    this.Login()
        }
  	}


    handleChange(e){
      let nextState={};

      nextState[e.target.name] = e.target.value;


      this.setState(nextState);

    };



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
              <DialogTitle id="alert-dialog-title">{"로그인"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">


              <TextField
                  id="outlined-name"
                  label="ID"
                  className={classes.textField}
                  value={this.state.id}
                  name="id"
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                  variant="outlined"
                />

                <br/>
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  name="pwd"
                   onChange={this.handleChange.bind(this)}
                  // autoComplete=""
                    onKeyPress={this._handleKeyPress.bind(this)}
                  margin="normal"
                  variant="outlined"
                />
                    <br/>
                    {this.state.failed ? <font color="red">ID 또는 비밀번호가 잘못되었습니다.</font>:''}
                    {this.state.blank ?  <font color="red">ID 또는 비밀번호를 입력해주세요.</font>:''}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  닫기
                </Button>
                <Button onClick={this.Login.bind(this)} color="primary">
                  로그인
                </Button>

              </DialogActions>
            </Dialog>
          </div>
        );
      }


};

export default withStyles(styles)(LoginLayer);
