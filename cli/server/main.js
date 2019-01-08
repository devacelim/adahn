
import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import bodyParser from 'body-parser';
import Login from './routes/auth';
import Work from './routes/work';


const app = express();
 
const port = 2005;
const devPort = 3001;


const apiVer='/api/v1/';

if(process.env.NODE_ENV == 'dev') {
    console.log('Server is running on development mode');
 
    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

// console.log("11")

 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use( express.static(__dirname + '/../public'));
app.use(apiVer+'auth', Login);
app.use(apiVer+'work', Work);
app.use('/download', express.static(__dirname + '/../uploads'));

app.use('*', function (req, res) {
	 res.redirect(302, '/')
});

 
 
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});

