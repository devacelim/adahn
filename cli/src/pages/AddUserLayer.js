import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {userAdd} from '../services/post.js';

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
    formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
});



class AddUserLayer extends Component {

    constructor(props){

        super(props);
// console.log(this.props)
        this.state= {
            open: true,
            id:'',
            pwd:'',
            name:'',
            dept:'',
            phone:'',
            email:'',
            notFill:false,
            exists:false


        };
        this.handleClose = this.handleClose.bind(this);

        // console.log()
    }

    handleClose () {

        this.setState({ open: false });
        this.props.addUserHandler();

    };

    async addUser(){
        let user={}
        user.user_id=this.state.id;
        user.user_pwd = this.state.pwd;
        user.user_name = this.state.name;
        user.user_email = this.state.email;
        user.user_phone = this.state.phone;
        user.user_dept = this.state.dept;
        user.user_position = this.state.position;
        if ( user.user_id=='' || user.user_pwd=='' || user.user_name==''||user.user_email==''||user.user_phone==''||user.user_dept==''||user.user_position==''||
        user.user_id==undefined || user.user_pwd==undefined|| user.user_name==undefined||user.user_email==undefined||user.user_phone==undefined||user.user_dept==undefined
        ||user.user_position==undefined){
            this.setState({notFill:true})
            // console.log(user)
            return;
        }
        else{
            this.setState({notFill:false})
             // console.log(user)

             let res = await userAdd(user);
            // console.log(res)
            if ( res.dup==1 )
                this.setState({exists:true})
            else
            {
                alert('정상적으로 등록되었습니다.');
                this.setState({ open: false });
                this.props.addUserHandler();

            }


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
              <DialogTitle id="alert-dialog-title">{"사용자 등록"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">


              <TextField
                  id="outlined-id"
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
                  margin="normal"
                  variant="outlined"
                />
                    <br/>
                  <TextField
                  id="outlined-name"
                  label="이름"
                  className={classes.textField}
                  value={this.state.name}
                  name="name"
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                  variant="outlined"
                />
                <br/>
                 <TextField
                  id="outlined-dept"
                  label="부서"
                  className={classes.textField}
                  value={this.state.dept}
                  name="dept"
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                  variant="outlined"
                />
                <br/>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-native-simple"
                      >
                        직책
                      </InputLabel>
                      <Select
                        native
                        value={this.state.position}
                        onChange={this.handleChange.bind(this)}
                        // name="position"
                        input={
                          <OutlinedInput
                            name="position"
                            labelWidth={100}
                            id="outlined-age-native-simple"
                          />
                        }
                      >
                        <option value="" />
                        <option value={'팀원'}>팀원</option>
                        <option value={'팀장'}>팀장</option>
                      </Select>
                    </FormControl>
                    <br/>
                 <TextField
                  id="outlined-phone"
                  label="연락처"
                  className={classes.textField}
                  value={this.state.phone}
                  name="phone"
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                  variant="outlined"
                />
                <br/>

                      <TextField
                  id="outlined-email"
                  label="이메일"
                  className={classes.textField}
                  value={this.state.email}
                  name="email"
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                  variant="outlined"
                />
                <br/>
                     {this.state.notFill ? <font color="red">모든 항목을 기입해주세요.</font>:''}
                     {this.state.exists ? <font color="red">동일한 ID가 등록되어있습니다.</font>:''}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  닫기
                </Button>
                <Button onClick={this.addUser.bind(this)} color="primary">
                  등록
                </Button>

              </DialogActions>
            </Dialog>
          </div>
        );
      }


};

export default withStyles(styles)(AddUserLayer);
