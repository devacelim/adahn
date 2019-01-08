import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DicIcon from '@material-ui/icons/LibraryBooks';
import cookie from 'react-cookies'
import Home from '../pages/Home'
import AddUserLayer from '../pages/AddUserLayer'
import LoginLayer from '../pages/LoginLayer'
import Button from '@material-ui/core/Button';
import { Route ,Link,Redirect} from 'react-router-dom';
import ModiUserLayer from "../pages/ModiUserLayer";


const mailFolderListItems = (
  <div>
  <ListItem component={Link} to="/home" button>
  <ListItemIcon>
  <DicIcon />
  </ListItemIcon>
  <ListItemText primary="업무일지" />
  </ListItem>



  </div>
);

// let reloadRoute = () => {
//     router.push({ pathname: '/empty' });
//     router.replace({ pathname: '/' });
// }
//

const drawerWidth = 190;
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: window.innerHeight,
    zIndex: 1,
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
    btn:{
      position:'relative',
        left:window.innerWidth-345

    },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});




class Header extends Component {


    constructor(props) {

        super(props);

        this.state={
            isLogined:false,
            showLoginLayer:false,
            showAddUserLayer:false,
            user_name:''
        }

    }

    componentWillMount(){
        this.checkLogin()

    }

    checkLogin(){
        let id_cookie = cookie.load('user_id');

        if ( id_cookie)
            this.setState({isLogined:true,showLoginLayer:false,user_name: cookie.load('user_name')})
        else
            this.setState({isLogined:false,showLoginLayer:true})

    }
    goLogin(){
        this.setState({showLoginLayer:true})
    }
    goAddUser(){
        this.setState({showAddUserLayer:true})
    }

    goLogOut(){
         cookie.remove('user_id', { path: '/' })
         cookie.remove('user_dept', { path: '/' })
         cookie.remove('user_email', { path: '/' })
         cookie.remove('user_position', { path: '/' })
         cookie.remove('user_name', { path: '/' })
        cookie.remove('user_phone', { path: '/' })
          this.setState({isLogined:false,showLoginLayer:true, showAddUserLayer:false})


    }
    LoginHandler(force){

        if ( force)
            this.setState({showLoginLayer:false,showAddUserLayer:false})
        else
            this.checkLogin()


    }
    addUserHandler(){
        this.setState({showAddUserLayer:false})
    }
      ModiUserHandler(isModi){
        this.setState({showModiUserLayer:false})

          if ( isModi)
          this.goLogOut();
    }

    goModiUser(){
        this.setState({showModiUserLayer:true})

    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            업무일지 시스템
                        </Typography>
                        {this.state.isLogined ?'': <Button id="regBtn" onClick={this.goAddUser.bind(this)} className={classes.btn} color="inherit">사용자등록</Button>}
                        {this.state.isLogined ? <span  style={{ position:'relative',left:50}} > {this.state.user_name}님 반갑습니다.</span> :''}
                         {this.state.isLogined ?   <Button style={{left:window.innerWidth-480}} onClick={this.goModiUser.bind(this)} className={classes.btn} color="inherit">정보변경</Button> :''}
                        {this.state.isLogined ?  <Button style={{left:window.innerWidth-480}} id="logOutBtn" onClick={this.goLogOut.bind(this)}className={classes.btn} color="inherit">로그아웃</Button>  :   <Button id="logBtn" onClick={this.goLogin.bind(this)}className={classes.btn} color="inherit">로그인</Button>}
                    </Toolbar>

                </AppBar>
                {this.state.isLogined ?
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar}/>
                    <List>{mailFolderListItems}</List>
                    <Divider/>


                </Drawer>
                    : ''}

                     {this.state.isLogined ?
                <main className={classes.content}>

                    <div className={classes.toolbar}/>

                    <Route path='/home' component={Home}/>
                    {/* <Redirect push to="/admin/home" from="/admin" /> */}
                </main>

                         : <Redirect push to="/" from="/home" />}
                {this.state.showAddUserLayer ? <AddUserLayer addUserHandler={this.addUserHandler.bind(this)} /> : ''}
                {this.state.showLoginLayer ?  <LoginLayer LoginHandler={this.LoginHandler.bind(this)}/> :''}
                  {this.state.showModiUserLayer ?  <ModiUserLayer ModiUserHandler={this.ModiUserHandler.bind(this)}/> :''}

            </div>
        );
    }

}



export default withStyles(styles)(Header);