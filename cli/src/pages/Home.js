import React, { Component } from 'react';

import InputTable from './InputTable'
import {getUser} from '../services/post.js';
import cookie from 'react-cookies'
import InfoTable from "./InfoTable";
import Search from './Search'


export default class Home extends Component {

    constructor(props){
        super(props);

        this.state={
            fetching:false,
            users:[],
            logined :'',
            position:'',
            new:false,
            search:{},
            reload:false
        }

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.location.key !== this.props.location.key) {
            // console.log("1")
             this.setState({reload:true})
            this._InputHandler();

        }
    };
    componentDidMount(){
        // console.log(cookie.load('user_position'))
        this.setState({logined: cookie.load('user_id'),position:cookie.load('user_position')})
        this.getUsers();
        // console.log("did")

    }
    async getUsers(){

        this.setState({fetching:true})

        let res = await getUser();
        this.setState({fetching:false,users:res.data})

    }
    _InputHandler(){
        // console.log("input!")
        this.setState({new:true})

    }
    _ReloadOk(){
        // console.log("reload!")
        this.setState({new:false})
    }
    _searchHandler(obj){

       // console.log(obj)
        this.setState({search:obj})

    }
    _searchOk(){
         this.setState({search:{}})
    }
    _onReloadStop(){
         this.setState({reload:false})
    }



  render() {
    return (
      <div>
        <h2>업무일지</h2>
          {this.state.users.length!=0 ? <InputTable InputHandler={this._InputHandler.bind(this)} LoginUser={this.state.logined} Users={this.state.users}/> :''}
          <Search onReloadStop={this._onReloadStop.bind(this)} Reload={this.state.reload} onSearch={this._searchHandler.bind(this)}/>
          {this.state.position && this.state.logined? <InfoTable SearchHandler={this._searchOk.bind(this)} Search={this.state.search} Reloadhandler={this._ReloadOk.bind(this)} Reload={this.state.new} LoginUser={this.state.logined} Position={this.state.position}/> :''}
      </div>
    );
  }
}




