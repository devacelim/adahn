
import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import bodyParser from 'body-parser';

const app = express();
 
const port = 3000;
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
 

 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use( express.static(__dirname + '/../public'));

app.use('*', function (req, res) {
	 res.redirect(302, '/')
});

 
 
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});

