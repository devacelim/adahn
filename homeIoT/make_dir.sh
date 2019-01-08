#!/bin/bash


prj_name=$1

mkdir build server public src server/routes && touch public/index.html server/main.js server/routes/posts.js src/App.js src/index.js webpack.dev.config.js webpack.config.js

cat > package.json << EOF
{
  "name": "$1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "clean": "rm -rf build public/bundle.js",
    "build": "babel server --out-dir build && ./node_modules/.bin/webpack",
    "start": "NODE_ENV=production node ./build/main.js",
    "dev": "NODE_ENV=development node ./build/main.js"
  },
  "author": "adahn.lim@gmail.com",
  "dependencies": {
    "express":"latest",
    "react": "^15.3.2",
    "react-addons-update": "^15.3.2",
    "react-dom": "^15.3.2",
    "react-redux": "^4.4.5",
    "react-router": "^2.8.1",
    "redux": "^3.6.0",
    "request":"latest"
  },
  "devDependencies": {
    "babel-core": "^6.17.0",
    "babel-loader": "^6.2.5",
    "babel-preset-es2015": "^6.16.0",
    "babel-preset-react": "^6.16.0",
    "webpack": "^1.13.2",
    "react-hot-loader":"latest",
    "webpack-dev-server": "^1.16.1"
  }
}
EOF


cat > webpack.config.js << EOF

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                }
            ]
        }
};

EOF

cat > webpack.dev.config.js << EOF

var webpack = require('webpack');
 
module.exports = {
 
    entry: [
        './src/index.js',
        'webpack-dev-server/client?http://0.0.0.0:3001',
        'webpack/hot/only-dev-server'
    ],
 
    output: {
        path: '/',
        filename: 'bundle.js'
    },
 
    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "**": "http://localhost:3000"
        }
    },
 
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
 
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                })],
                exclude: /node_modules/,
            }
        ]
    }
};

EOF

cat > .babelrc << EOF
{
    "presets": ["es2015"]
}
EOF


cat > server/main.js << EOF

import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';


const app = express();
 
const port = 3000;
const devPort = 3001;


if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
 
    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}
 

app.use('/', express.static(__dirname + '/../public'));
 
app.get('/hello', (req, res) => {
    return res.send('Can you hear me?');
});
 

import posts from './routes/posts';


app.use('/posts', posts);
 
 
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});
EOF

cat > server/routes/posts.js << EOF
import express from 'express';
 
const router = express.Router();
 
router.get('/', (req,res) => {
    res.send('posts');
});
 
router.get('/read/:id', (req, res) => {
    res.send('You are reading post ' + req.params.id);
});
 
export default router;
EOF
