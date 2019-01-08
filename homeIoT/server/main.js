
import express from 'express';
import babelcore from 'babel-core/register';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import Torrent from './routes/Torrent';
import Ftp from './routes/Ftp';
//import Qtum from './routes/qtum';
import Alarms from './routes/alarms';
//import posts from './routes/posts';
import Dashboard from './routes/Dashboard';
import Balance from './routes/balance';
import bodyParser from 'body-parser';

const app = express();
 
const port = 3000;
const devPort = 3001;


const apiVer='/api/v1/';

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
 
    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}
 

//  var allowCORS = function(req, res, next) {
//   res.header('Acess-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   (req.method === 'OPTIONS') ?
//     res.send(200) :
//     next();
// };
 


//  app.use(allowCORS);

 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(apiVer+'torrent', Torrent);
app.use(apiVer+'ftp', Ftp); 
app.use(apiVer+'Dashboard', Dashboard); 
app.use(apiVer+'alarms', Alarms); 
app.use(apiVer+'balance', Balance); 
//app.use(apiVer+'qtum', Qtum); 
app.use( express.static(__dirname + '/../public'));

app.use('*', function (req, res) {
	 res.redirect(302, '/')
});

 
 
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});
