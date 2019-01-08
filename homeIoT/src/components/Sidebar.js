import React from 'react';
import { Link } from 'react-router';
import { stack as Menu } from 'react-burger-menu';
import Radium from 'radium';
let RadiumLink = Radium(Link);
import DocumentMeta from 'react-document-meta';
 


class Sidebar extends React.Component {



    constructor(props){
      super(props)
      this.state={
        'mobile':true
      }
    }



    _viewportChange(){

      this.setState({
        'mobile':!this.state.mobile
      })

    }

    render() {
         const meta = {
                meta:{
                  name:{
                    viewport:'width=device-width, initial-scale=1, user-scalable=no'
                  }
                }
              }
         const meta1 = {
                meta:{
                  name:{
                    viewport:''
                  }
                }
              }


        return ( 
               
              <div >

                 {this.state.mobile ?  <DocumentMeta {...meta}/> :   <DocumentMeta {...meta1}/>}
               <Menu id="slide" isOpen={this.props.isOpen }  width={ 240 }>
                  <RadiumLink className="menu-item" to="/"> <i className="fa fa-home" aria-hidden="true"></i> Dashboard</RadiumLink>
                  <RadiumLink className="menu-item" to="/dashboard/history"> ↪ <i className="fa fa-television" aria-hidden="true"></i>History</RadiumLink>
                  <RadiumLink className="menu-item"> <i className="fa fa-download" aria-hidden="true"></i> Torrent</RadiumLink>
                  <RadiumLink className="menu-item" to="/torrent/list/kr_drama"> ↪ <i className="fa fa-television" aria-hidden="true"></i> drama</RadiumLink>
                  <RadiumLink className="menu-item" to="/torrent/list/kr_ent">↪ <i className="fa fa-smile-o" aria-hidden="true"></i> Entertainment</RadiumLink>
                  <RadiumLink className="menu-item" to="/torrent/list/movie_new">↪ <i className="fa fa-film" aria-hidden="true"></i> Movie</RadiumLink>
                  <RadiumLink className="menu-item" to="/torrent/list/kr_daq">↪ <i className="fa fa-television" aria-hidden="true"></i> TV</RadiumLink>
                   <RadiumLink className="menu-item" to="/torrent/list/util">↪ <i className="fa fa-anchor" aria-hidden="true"></i> Util</RadiumLink>
                  <RadiumLink className="menu-item" to="/torrent/status">↪ <i className="fa fa-info-circle" aria-hidden="true"></i> Status</RadiumLink>
                  <RadiumLink className="menu-item" to="/ftp/list"> <i className="fa fa-list" aria-hidden="true"></i> FTP</RadiumLink>
                  <RadiumLink className="menu-item" to="/nbbang"> <i className="fa fa-krw" aria-hidden="true"></i> N-bbang</RadiumLink>
                  <RadiumLink className="menu-item" to="/alarms"> <i className="fa fa-btc" aria-hidden="true"></i> Alarms</RadiumLink>
              

                  {this.state.mobile? <a onClick={this._viewportChange.bind(this)}> <i className="fa fa-desktop" aria-hidden="true"></i> Desktop view</a>: <a onClick={this._viewportChange.bind(this)}> <i className="fa fa-mobile" aria-hidden="true"></i> Mobile view</a>}

              </Menu>
</div>
               

                                
        );
    }

}


export default Sidebar
