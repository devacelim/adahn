import React from 'react';
import ReactDOM from 'react-dom';

import App, {NoMatch}  from './components/App';
import Dashboard  from './components/Dashboard';
import DashboardHistory from './components/DashboardHistory'
import TorrentList from './components/TorrentList'
import TorrentStatus from './components/TorrentStatus'
import FtpList from './components/FtpList'
import Nbbang from './components/Nbbang'
import Alarms from './components/Alarms'
import Qtum from './components/Qtum'
import { Router,  Route, IndexRoute , browserHistory } from 'react-router'

import { createStore} from 'redux';
import { Provider } from 'react-redux';



const rootElement = document.getElementById('root');


ReactDOM.render(<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute  component = {Dashboard}/>
						<Route path="/dashboard/history" component={DashboardHistory}/>
						<Route path="torrent/list/:title" component={TorrentList}/>
						<Route path="torrent/status" component={TorrentStatus}/>
						<Route path="ftp/list" component={FtpList}/>
						<Route path="nbbang" component={Nbbang}/>
						<Route path="/alarms" component={Alarms}/>
						<Route path="/qtum" component={Qtum}/>
						<Route path="*" component={NoMatch}/>
					</Route>
				</Router>,rootElement)
