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
import {modiUser} from '../services/post.js';
import cookie from 'react-cookies'


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



class ModiUserLayer extends Component {

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
            position:'',
            notFill:false,
            // exists:false


        };
        this.handleClose = this.handleClose.bind(this);

        // console.log()
    }

    componentWillMount(){
        this.setState({
            id :cookie.load('user_id'),
            name:cookie.load('user_name'),
            dept:cookie.load('user_dept'),
            phone:cookie.load('user_phone'),
            email:cookie.load('user_email'),
            position:cookie.load('user_position')
        })

    }
    handleClose () {

        this.setState({ open: false });
        this.props.ModiUserHandler();

    };

    async modiUser(){
        let user={}
        user.user_id=this.state.id;
        user.user_pwd = this.state.pwd;
        user.user_name = this.state.name;
        user.user_email = this.state.email;
        user.user_phone = this.state.phone;
        user.user_dept = this.state.dept;
        user.user_position = this.state.position;
        if ( user.user_id=='' ||  user.user_name==''||user.user_email==''||user.user_phone==''||user.user_dept==''||user.user_position==''||
        user.user_id==undefined ||  user.user_name==undefined||user.user_email==undefined||user.user_phone==undefined||user.user_dept==undefined
        ||user.user_position==undefined){
            this.setState({notFill:true})
            // console.log(user)
            return;
        }
        else{
            this.setState({notFill:false})
             // console.log(user)

             let res = await modiUser(user);
            // console.log(res)
                if( res.data.affectedRows == 1) {
                    alert('정상적으로 변경되었습니다.');
                    this.setState({open: false});
                    this.props.ModiUserHandler(true);
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
              <DialogTitle id="alert-dialog-title">{"사용자 정보 수정"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">


              <TextField
                  id="outlined-id1"
                  label="ID"
                  className={classes.textField}
                  value={this.state.id}
                  name="id"
                  disabled
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                  variant="outlined"
                />
                <br/>
                <TextField
                  id="outlined-password-input1"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  name="pwd"
                  placeholder="입력시 변경됩니다."
                   onChange={this.handleChange.bind(this)}
                  // autoComplete=""
                  margin="normal"
                  variant="outlined"
                />
                    <br/>
                  <TextField
                  id="outlined-name1"
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
                  id="outlined-dept1"
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
                            id="outlined-age-native-simple1"
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
                  id="outlined-phone1"
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
                  id="outlined-email1"
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

                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  닫기
                </Button>
                <Button onClick={this.modiUser.bind(this)} color="primary">
                  변경
                </Button>

              </DialogActions>
            </Dialog>
          </div>
        );
      }


};

export default withStyles(styles)(ModiUserLayer);
